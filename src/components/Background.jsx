import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Background = ({ isLoading }) => {
  const containerRef = useRef(null);
  const isLoadingRef = useRef(isLoading);

  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 180; // Start zoomed out for entrance transition
    if (width > 768) {
      camera.position.x = -20;
    }

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x222222);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(1, 2, 3);
    scene.add(mainLight);

    const crimsonLight = new THREE.PointLight(0xff2a00, 4, 150);
    crimsonLight.position.set(-30, 10, 20);
    scene.add(crimsonLight);

    const crimsonLight2 = new THREE.PointLight(0xff2a00, 2, 200);
    crimsonLight2.position.set(50, -50, -50);
    scene.add(crimsonLight2);

    // Group to hold all interactive scene elements
    const sceneGroup = new THREE.Group();
    scene.add(sceneGroup);

    // 1. Inner Morphing Crystal (Faceted Icosahedron)
    const crystalGeo = new THREE.IcosahedronGeometry(18, 3);

    // Store original vertices for morphing math
    const posAttribute = crystalGeo.attributes.position;
    const originalPositions = [];
    for (let i = 0; i < posAttribute.count; i++) {
      originalPositions.push(
        posAttribute.getX(i),
        posAttribute.getY(i),
        posAttribute.getZ(i)
      );
    }
    crystalGeo.userData.originalPositions = originalPositions;

    const crystalMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.15,
      metalness: 0.9,
      flatShading: true // Gives it the tech/faceted look
    });
    const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
    sceneGroup.add(crystalMesh);

    // 2. Outer Rotating Wireframe (Tech Nexus)
    const wireGeo = new THREE.IcosahedronGeometry(28, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xff2a00,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    sceneGroup.add(wireMesh);

    // 3. Floating Data Particles
    const particleGeo = new THREE.BufferGeometry();
    const particleCount = 200;
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      particlePos[i] = (Math.random() - 0.5) * 120; // Spread over 120 units
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xff2a00,
      size: 1.2,
      transparent: true,
      opacity: 0.0  // Start invisible; fade in during entrance
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    sceneGroup.add(particles);

    // Mouse interaction state
    let targetRotationX = 0;
    let targetRotationY = 0;
    let containerHalfX = (container.clientWidth || window.innerWidth) / 2;
    let containerHalfY = (container.clientHeight || window.innerHeight) / 2;

    const onMouseMove = (event) => {
      targetRotationY = (event.clientX - containerHalfX) * 0.001;
      targetRotationX = (event.clientY - containerHalfY) * 0.001;
    };

    document.addEventListener('mousemove', onMouseMove);

    // Set initial scale to tiny for the preloader fade-in reveal
    crystalMesh.scale.setScalar(0.001);
    wireMesh.scale.setScalar(0.001);

    // Animation Loop
    let time = 0;
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      const delta = Math.min(clock.getDelta(), 0.1); // Cap delta to prevent huge jumps
      const timeFactor = delta * 60; // Normalize to 60fps equivalent for the constants

      time += 0.015 * timeFactor;

      // Slow entrance: zoom camera and scale up elements gradually after loading fades
      const targetZ = isLoadingRef.current ? 180 : 100;
      const targetScale = isLoadingRef.current ? 0.001 : 1.0;
      const targetParticleOpacity = isLoadingRef.current ? 0.0 : 0.6;

      // Frame-independent lerp factors
      camera.position.z += (targetZ - camera.position.z) * (0.012 * timeFactor);

      const currentScale = crystalMesh.scale.x;
      const nextScale = currentScale + (targetScale - currentScale) * (0.012 * timeFactor);
      crystalMesh.scale.setScalar(nextScale);
      wireMesh.scale.setScalar(nextScale);

      // Fade particles in slowly
      particleMat.opacity += (targetParticleOpacity - particleMat.opacity) * (0.012 * timeFactor);

      // Morph Crystal Vertices (Spiky Processing Effect)
      const orig = crystalMesh.geometry.userData.originalPositions;
      const pos = crystalMesh.geometry.attributes.position;
      const v = new THREE.Vector3();

      for (let i = 0; i < pos.count; i++) {
        v.set(orig[i * 3], orig[i * 3 + 1], orig[i * 3 + 2]);

        const distance = v.length();
        // Complex sine wave combination to create abstract pulsing spikes
        const pulse = Math.sin(v.x * 0.25 + time * 1.5) * Math.cos(v.y * 0.25 + time * 1.5) * Math.sin(v.z * 0.25 + time * 1.5);

        // Only scale outward, creating sharp data nodes popping out
        const scale = 1 + (Math.max(0, pulse) * 0.5);

        v.normalize().multiplyScalar(distance * scale);
        pos.setXYZ(i, v.x, v.y, v.z);
      }
      pos.needsUpdate = true;
      // Only compute vertex normals every few frames or conditionally if it causes lag, but it's okay for 642 vertices.
      crystalMesh.geometry.computeVertexNormals();

      // Parallax scene rotation towards mouse
      sceneGroup.rotation.y += (targetRotationY - sceneGroup.rotation.y) * (0.05 * timeFactor);
      sceneGroup.rotation.x += (targetRotationX - sceneGroup.rotation.x) * (0.05 * timeFactor);

      // Constant base rotations
      crystalMesh.rotation.y += 0.003 * timeFactor;
      crystalMesh.rotation.z += 0.002 * timeFactor;

      wireMesh.rotation.y -= 0.001 * timeFactor;
      wireMesh.rotation.x -= 0.002 * timeFactor;

      particles.rotation.y += 0.0005 * timeFactor;

      renderer.render(scene, camera);
    };

    // Responsive Layout Handling
    const onResize = () => {
      const currentWidth = container.clientWidth || window.innerWidth;
      const currentHeight = container.clientHeight || window.innerHeight;
      camera.aspect = currentWidth / currentHeight;
      if (currentWidth > 768) {
        camera.position.x = -20; // Keep shifted left on desktop
      } else {
        camera.position.x = 0; // Center on mobile
      }
      camera.updateProjectionMatrix();
      renderer.setSize(currentWidth, currentHeight);
      containerHalfX = currentWidth / 2;
      containerHalfY = currentHeight / 2;
    };

    window.addEventListener('resize', onResize);

    animate();

    return () => {
      window.removeEventListener('resize', onResize);
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Cleanup geometries and materials to avoid memory leaks
      crystalGeo.dispose();
      crystalMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <div id="canvas-container" ref={containerRef}></div>;
};

export default Background;
