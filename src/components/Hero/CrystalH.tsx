'use client'
import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react'
import * as THREE from 'three'

export interface CrystalHRef {
  updateRoughness: (val: number) => void
  updateNoiseScale: (val: number) => void
  updateColor: (hex: string) => void
  resetQuaternion: () => void
}

interface CrystalHProps {
  onQuaternionUpdate: (q: { x: number; y: number; z: number; w: number }) => void
}

function createHGeometry(): THREE.BufferGeometry {
  const shape = new THREE.Shape()
  const lw = 0.8
  const rw = 0.8
  const cw = 1.2
  const ch = 0.6
  const h = 4.0
  const totalW = lw + cw + rw

  shape.moveTo(0, 0)
  shape.lineTo(lw, 0)
  shape.lineTo(lw, (h - ch) / 2)
  shape.lineTo(lw + cw, (h - ch) / 2)
  shape.lineTo(lw + cw, 0)
  shape.lineTo(totalW, 0)
  shape.lineTo(totalW, h)
  shape.lineTo(lw + cw, h)
  shape.lineTo(lw + cw, (h + ch) / 2)
  shape.lineTo(lw, (h + ch) / 2)
  shape.lineTo(lw, h)
  shape.lineTo(0, h)
  shape.lineTo(0, 0)

  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    steps: 1,
    depth: 1.2,
    bevelEnabled: true,
    bevelThickness: 0.08,
    bevelSize: 0.06,
    bevelSegments: 4,
  }

  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
  geometry.center()
  return geometry
}

const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vViewDir;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vViewDir = normalize(cameraPosition - worldPos.xyz);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vViewDir;
  uniform float uTime;
  uniform float uRoughness;
  uniform float uNoiseScale;
  uniform vec3 uColor;

  vec3 iridescence(float cosTheta, float time) {
    float fresnel = pow(1.0 - cosTheta, 3.0);
    float hue = fresnel * 2.5 + time * 0.15;

    vec3 col1 = vec3(0.43, 0.16, 0.65);
    vec3 col2 = vec3(0.08, 0.64, 0.75);
    vec3 col3 = vec3(0.97, 0.62, 0.04);
    vec3 col4 = vec3(0.06, 0.73, 0.51);

    float t = fract(hue);
    float idx = floor(hue);

    vec3 color;
    if (mod(idx, 4.0) < 1.0)      color = mix(col1, col2, t);
    else if (mod(idx, 4.0) < 2.0) color = mix(col2, col3, t);
    else if (mod(idx, 4.0) < 3.0) color = mix(col3, col4, t);
    else                            color = mix(col4, col1, t);

    return color;
  }

  void main() {
    vec3 normal = normalize(vNormal);
    float cosTheta = dot(normal, vViewDir);

    vec3 baseColor = vec3(0.05, 0.04, 0.08) * uColor;
    vec3 iridColor = iridescence(abs(cosTheta), uTime);

    float fresnel = pow(1.0 - abs(cosTheta), 2.0 + uRoughness * 3.0);

    float n = fract(sin(dot(vPosition * uNoiseScale, vec3(12.9898, 78.233, 45.543))) * 43758.5453);
    float roughMask = mix(1.0, n, uRoughness * 0.5);

    vec3 finalColor = mix(baseColor, iridColor, fresnel * roughMask * 1.5);

    float streak = pow(max(0.0, dot(reflect(-vViewDir, normal), vec3(0.5, 0.8, 0.3))), 30.0);
    finalColor += streak * 0.8 * iridColor;

    float alpha = mix(0.85, 0.97, fresnel);

    gl_FragColor = vec4(finalColor, alpha);
  }
`

const CrystalH = forwardRef<CrystalHRef, CrystalHProps>(({ onQuaternionUpdate }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)
  const rafRef = useRef<number>(0)

  useImperativeHandle(ref, () => ({
    updateRoughness: (val) => {
      if (materialRef.current) materialRef.current.uniforms.uRoughness.value = val
    },
    updateNoiseScale: (val) => {
      if (materialRef.current) materialRef.current.uniforms.uNoiseScale.value = val
    },
    updateColor: (hex) => {
      if (materialRef.current) materialRef.current.uniforms.uColor.value.set(hex)
    },
    resetQuaternion: () => {
      if (meshRef.current) {
        meshRef.current.quaternion.identity()
        meshRef.current.rotation.set(0, 0, 0)
      }
    },
  }))

  const meshRef = useRef<THREE.Mesh | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const container = canvas.parentElement!
    let width = container.clientWidth
    let height = container.clientHeight

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    renderer.setClearColor(0x000000, 0)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.z = 8

    // Scene
    const scene = new THREE.Scene()

    // Lights
    const ambient = new THREE.AmbientLight(0x111111, 0.8)
    scene.add(ambient)

    const purpleLight = new THREE.DirectionalLight(0x7b5ea7, 3)
    purpleLight.position.set(5, 5, 5)
    scene.add(purpleLight)

    const tealLight = new THREE.PointLight(0x2dd4bf, 5, 20)
    tealLight.position.set(-5, 3, 3)
    scene.add(tealLight)

    const goldLight = new THREE.PointLight(0xf59e0b, 3, 20)
    goldLight.position.set(4, -3, 4)
    scene.add(goldLight)

    // Material
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime:       { value: 0 },
        uRoughness:  { value: 0.10 },
        uNoiseScale: { value: 9.0 },
        uColor:      { value: new THREE.Color(1, 1, 1) },
      },
      transparent: true,
      side: THREE.DoubleSide,
    })
    materialRef.current = material

    // Mesh
    const geometry = createHGeometry()
    const mesh = new THREE.Mesh(geometry, material)
    meshRef.current = mesh
    scene.add(mesh)

    // State
    let autoRotate = true
    let isDragging = false
    let prevMouse = { x: 0, y: 0 }
    const mouseInfluence = { x: 0, y: 0 }
    const targetMouseInfluence = { x: 0, y: 0 }
    let resumeTimeout: ReturnType<typeof setTimeout>

    // Animation loop
    function animate(time: number) {
      rafRef.current = requestAnimationFrame(animate)

      material.uniforms.uTime.value = time * 0.001

      if (autoRotate) {
        mesh.rotation.y += 0.003
        mesh.rotation.x += 0.0008
      }

      mouseInfluence.x += (targetMouseInfluence.x - mouseInfluence.x) * 0.05
      mouseInfluence.y += (targetMouseInfluence.y - mouseInfluence.y) * 0.05

      if (autoRotate) {
        mesh.rotation.y += mouseInfluence.x * 0.008
        mesh.rotation.x += mouseInfluence.y * 0.008
      }

      tealLight.position.x = Math.sin(time * 0.0003) * 6
      goldLight.position.y = Math.cos(time * 0.0004) * 4

      const q = mesh.quaternion
      onQuaternionUpdate({ x: q.x, y: q.y, z: q.z, w: q.w })

      renderer.render(scene, camera)
    }
    animate(0)

    // Mouse parallax
    function onMouseMove(e: MouseEvent) {
      targetMouseInfluence.x = (e.clientX / window.innerWidth - 0.5) * 2
      targetMouseInfluence.y = (e.clientY / window.innerHeight - 0.5) * 2

      if (!isDragging) return
      const dx = (e.clientX - prevMouse.x) * 0.01
      const dy = (e.clientY - prevMouse.y) * 0.01
      mesh.rotation.y += dx
      mesh.rotation.x += dy
      prevMouse = { x: e.clientX, y: e.clientY }
    }

    function onMouseDown(e: MouseEvent) {
      isDragging = true
      autoRotate = false
      clearTimeout(resumeTimeout)
      prevMouse = { x: e.clientX, y: e.clientY }
    }

    function onMouseUp() {
      if (isDragging) {
        isDragging = false
        resumeTimeout = setTimeout(() => { autoRotate = true }, 2000)
      }
    }

    function onResize() {
      width = container.clientWidth
      height = container.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafRef.current)
      clearTimeout(resumeTimeout)
      window.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [onQuaternionUpdate])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
      }}
    />
  )
})

CrystalH.displayName = 'CrystalH'
export default CrystalH
