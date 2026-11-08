import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const SubstationHero3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    // SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0c1017);
    scene.fog = new THREE.FogExp2(0x0c1017, 0.018);

    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    // Cinematic camera angle: low-angle looking up at the high voltage gantry and transformer
    camera.position.set(22, 13, 34);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // MATERIALS
    const concreteMaterial = new THREE.MeshStandardMaterial({
      color: 0x222933,
      roughness: 0.85,
      metalness: 0.1
    });

    const gravelMaterial = new THREE.MeshStandardMaterial({
      color: 0x121720,
      roughness: 0.95,
      metalness: 0.05
    });

    const steelDark = new THREE.MeshStandardMaterial({
      color: 0x1c232d,
      roughness: 0.38,
      metalness: 0.75
    });

    const galvanizedSteel = new THREE.MeshStandardMaterial({
      color: 0x4f5b6d,
      roughness: 0.42,
      metalness: 0.75
    });

    const copperConductor = new THREE.MeshStandardMaterial({
      color: 0xc27835,
      roughness: 0.3,
      metalness: 0.85
    });

    const porcelainInsulator = new THREE.MeshStandardMaterial({
      color: 0x6e331b,
      roughness: 0.25,
      metalness: 0.1
    });

    const beaconLightMat = new THREE.MeshBasicMaterial({
      color: 0xff3333
    });

    // 1. GROUND & SUBSTATION YARD
    const groundGeo = new THREE.PlaneGeometry(200, 200);
    const ground = new THREE.Mesh(groundGeo, gravelMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    ground.receiveShadow = true;
    scene.add(ground);

    // Subtle CAD grid helper
    const gridHelper = new THREE.GridHelper(140, 35, 0x0284c7, 0x161e2a);
    gridHelper.position.y = 0.02;
    scene.add(gridHelper);

    // 2. CONCRETE PLINTHS & FOUNDATION PADS
    const plinthGeo = new THREE.BoxGeometry(15, 1.0, 12);
    const plinth = new THREE.Mesh(plinthGeo, concreteMaterial);
    plinth.position.set(0, 0.5, 0);
    plinth.receiveShadow = true;
    plinth.castShadow = true;
    scene.add(plinth);

    // Oil containment curb
    const curbGeo = new THREE.BoxGeometry(17, 0.45, 14);
    const curb = new THREE.Mesh(curbGeo, concreteMaterial);
    curb.position.set(0, 0.22, 0);
    scene.add(curb);

    // 3. HIGH-VOLTAGE POWER TRANSFORMER (MAIN TANK)
    const transformerGroup = new THREE.Group();

    // Main tank body
    const tankGeo = new THREE.BoxGeometry(8, 6.5, 5.5);
    const tank = new THREE.Mesh(tankGeo, steelDark);
    tank.position.set(0, 4.25, 0);
    tank.castShadow = true;
    tank.receiveShadow = true;
    transformerGroup.add(tank);

    // Radiator Cooling Fins (Left & Right Banks)
    for (let i = -3.0; i <= 3.0; i += 0.45) {
      const finGeo = new THREE.BoxGeometry(0.08, 4.5, 2.4);
      const finLeft = new THREE.Mesh(finGeo, steelDark);
      finLeft.position.set(i, 4.0, 3.8);
      finLeft.castShadow = true;
      transformerGroup.add(finLeft);

      const finRight = new THREE.Mesh(finGeo, steelDark);
      finRight.position.set(i, 4.0, -3.8);
      finRight.castShadow = true;
      transformerGroup.add(finRight);
    }

    // Conservator Tank
    const conservatorGeo = new THREE.CylinderGeometry(1.1, 1.1, 6.8, 24);
    const conservator = new THREE.Mesh(conservatorGeo, steelDark);
    conservator.rotation.z = Math.PI / 2;
    conservator.position.set(0, 8.4, -1.4);
    conservator.castShadow = true;
    transformerGroup.add(conservator);

    // Buchholz relay pipe
    const pipeGeo = new THREE.CylinderGeometry(0.2, 0.2, 2.0, 12);
    const pipe = new THREE.Mesh(pipeGeo, steelDark);
    pipe.position.set(1.6, 7.6, -0.7);
    pipe.rotation.x = Math.PI / 4;
    transformerGroup.add(pipe);

    // High Voltage Bushings (3 EHV Porcelain Bushings + Terminals)
    const bushingOffsets = [-2.4, 0, 2.4];
    bushingOffsets.forEach((offsetX) => {
      const turretGeo = new THREE.CylinderGeometry(0.55, 0.7, 0.9, 16);
      const turret = new THREE.Mesh(turretGeo, steelDark);
      turret.position.set(offsetX, 7.8, 1.3);
      transformerGroup.add(turret);

      for (let r = 0; r < 7; r++) {
        const discGeo = new THREE.CylinderGeometry(0.44, 0.48, 0.24, 16);
        const disc = new THREE.Mesh(discGeo, porcelainInsulator);
        disc.position.set(offsetX, 8.4 + r * 0.38, 1.3);
        transformerGroup.add(disc);
      }

      const stemGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.1, 12);
      const stem = new THREE.Mesh(stemGeo, copperConductor);
      stem.position.set(offsetX, 11.2, 1.3);
      transformerGroup.add(stem);

      const coronaRingGeo = new THREE.TorusGeometry(0.42, 0.05, 8, 24);
      const ring = new THREE.Mesh(coronaRingGeo, galvanizedSteel);
      ring.rotation.x = Math.PI / 2;
      ring.position.set(offsetX, 11.4, 1.3);
      transformerGroup.add(ring);
    });

    scene.add(transformerGroup);

    // 4. EHV LATTICE GANTRY TRANSMISSION TOWERS
    const gantryGroup = new THREE.Group();

    const createLatticeColumn = (xPos: number, zPos: number, heightVal: number) => {
      const colGroup = new THREE.Group();
      colGroup.position.set(xPos, 0, zPos);

      const legGeo = new THREE.CylinderGeometry(0.09, 0.13, heightVal, 8);
      const halfH = heightVal / 2;

      const legPositions = [
        { x: -1.0, z: -1.0 },
        { x: 1.0, z: -1.0 },
        { x: -1.0, z: 1.0 },
        { x: 1.0, z: 1.0 }
      ];

      legPositions.forEach((pos) => {
        const leg = new THREE.Mesh(legGeo, galvanizedSteel);
        leg.position.set(pos.x, halfH, pos.z);
        leg.castShadow = true;
        colGroup.add(leg);
      });

      const numTiers = Math.floor(heightVal / 2.4);
      for (let t = 1; t <= numTiers; t++) {
        const tierY = t * 2.4;
        const ringMesh = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.07, 2.0), galvanizedSteel);
        ringMesh.position.set(0, tierY, 0);
        colGroup.add(ringMesh);

        const crossGeo = new THREE.CylinderGeometry(0.035, 0.035, 3.1, 6);
        const cross1 = new THREE.Mesh(crossGeo, galvanizedSteel);
        cross1.position.set(0, tierY - 1.2, 1.0);
        cross1.rotation.z = Math.PI / 4;
        colGroup.add(cross1);

        const cross2 = new THREE.Mesh(crossGeo, galvanizedSteel);
        cross2.position.set(0, tierY - 1.2, 1.0);
        cross2.rotation.z = -Math.PI / 4;
        colGroup.add(cross2);
      }

      const ped = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.9, 2.6), concreteMaterial);
      ped.position.set(0, 0.45, 0);
      ped.castShadow = true;
      colGroup.add(ped);

      return colGroup;
    };

    const leftTower = createLatticeColumn(-13, 15, 24);
    const rightTower = createLatticeColumn(13, 15, 24);
    gantryGroup.add(leftTower);
    gantryGroup.add(rightTower);

    // Cross-beam Truss
    const spanWidth = 26;
    const crossBeam = new THREE.Mesh(new THREE.BoxGeometry(spanWidth, 1.3, 1.3), galvanizedSteel);
    crossBeam.position.set(0, 22, 15);
    crossBeam.castShadow = true;
    gantryGroup.add(crossBeam);

    // Warning Beacons
    const beaconGeo = new THREE.SphereGeometry(0.28, 12, 12);
    const leftBeacon = new THREE.Mesh(beaconGeo, beaconLightMat);
    leftBeacon.position.set(-13, 27.5, 15);
    gantryGroup.add(leftBeacon);

    const rightBeacon = new THREE.Mesh(beaconGeo, beaconLightMat);
    rightBeacon.position.set(13, 27.5, 15);
    gantryGroup.add(rightBeacon);

    // Overhead Busbars and Suspension Insulators
    const busbarOffsets = [-6.5, 0, 6.5];
    busbarOffsets.forEach((bx, idx) => {
      const stringGroup = new THREE.Group();
      stringGroup.position.set(bx, 21.3, 15);
      for (let s = 0; s < 8; s++) {
        const disc = new THREE.Mesh(
          new THREE.CylinderGeometry(0.42, 0.48, 0.2, 12),
          porcelainInsulator
        );
        disc.position.y = -s * 0.3;
        stringGroup.add(disc);
      }
      gantryGroup.add(stringGroup);

      const targetBushingX = bushingOffsets[idx] || 0;
      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(bx, 18.5, 15),
        new THREE.Vector3((bx + targetBushingX) / 2, 13.0, 8.0),
        new THREE.Vector3(targetBushingX, 11.6, 1.3)
      );

      const tubeGeo = new THREE.TubeGeometry(curve, 24, 0.06, 8, false);
      const tubeMesh = new THREE.Mesh(tubeGeo, copperConductor);
      gantryGroup.add(tubeMesh);
    });

    scene.add(gantryGroup);

    // 5. CABLE TRENCHES WITH PRECAST COVERS
    const trenchGeo = new THREE.BoxGeometry(2.6, 0.4, 40);
    const trench = new THREE.Mesh(trenchGeo, concreteMaterial);
    trench.position.set(-9.0, 0.2, 0);
    scene.add(trench);

    // 6. ATMOSPHERIC INDUSTRIAL LIGHTING
    const ambientLight = new THREE.AmbientLight(0x182433, 1.6);
    scene.add(ambientLight);

    const dirSun = new THREE.DirectionalLight(0xf59e0b, 2.2);
    dirSun.position.set(45, 30, 32);
    dirSun.castShadow = true;
    dirSun.shadow.mapSize.width = 2048;
    dirSun.shadow.mapSize.height = 2048;
    scene.add(dirSun);

    const blueFill = new THREE.DirectionalLight(0x0284c7, 1.1);
    blueFill.position.set(-35, 22, -25);
    scene.add(blueFill);

    const floodlight = new THREE.PointLight(0xffa500, 3.2, 40, 1.2);
    floodlight.position.set(-12, 18, 14);
    scene.add(floodlight);

    // Corona particles
    const particleCount = 35;
    const particlesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let p = 0; p < particleCount; p++) {
      positions[p * 3] = (Math.random() - 0.5) * 6;
      positions[p * 3 + 1] = 11.5 + Math.random() * 2.5;
      positions[p * 3 + 2] = 1.3 + (Math.random() - 0.5) * 2;
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.16,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const sparkSystem = new THREE.Points(particlesGeo, particleMat);
    scene.add(sparkSystem);

    // MOUSE PARALLAX & CAMERA LERP
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };

    window.addEventListener('resize', handleResize);

    // ANIMATION LOOP
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Pulsing beacon
      beaconLightMat.opacity = Math.sin(elapsed * 4) > 0.2 ? 1 : 0.15;

      // Subtle camera orbit
      const targetX = 22 + mouseX * 3.5 + Math.sin(elapsed * 0.1) * 2;
      const targetY = 13 + mouseY * 2.0 + Math.cos(elapsed * 0.12) * 0.8;
      const targetZ = 34 + Math.sin(elapsed * 0.06) * 2;

      camera.position.x += (targetX - camera.position.x) * 0.03;
      camera.position.y += (targetY - camera.position.y) * 0.03;
      camera.position.z += (targetZ - camera.position.z) * 0.03;

      camera.lookAt(0, 8, 4);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  if (!hasWebGL) {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117] via-[#161c24] to-[#0d1117]" />
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />
      {/* Cinematic Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 35%, rgba(2, 132, 199, 0.06) 0%, rgba(13, 17, 23, 0.5) 60%, rgba(13, 17, 23, 0.95) 100%)'
        }}
      />
    </div>
  );
};
