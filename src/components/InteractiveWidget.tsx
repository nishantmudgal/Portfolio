import React, { useState, useEffect, useRef } from "react";
import { 
  Play, Pause, RefreshCw, Zap, Cpu, Server, Check, 
  ArrowRightLeft, AlertCircle, Sparkles, Sliders, Layers, Info
} from "lucide-react";

// ==========================================
// 1. HYPERION ANALYTICS INTERACTIVE DEMO
// ==========================================
export function HyperionDemo() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [samplingRate, setSamplingRate] = useState(1000); // ms
  const [data, setData] = useState<{ id: number; value: number; time: string }[]>([]);
  const [metricSum, setMetricSum] = useState(0);
  const [spikeDetected, setSpikeDetected] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Seed initial data
    const initialData = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      value: Math.floor(Math.random() * 40) + 30,
      time: `${12 - i}s ago`
    }));
    setData(initialData);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setData(prev => {
          const nextId = prev.length ? prev[prev.length - 1].id + 1 : 0;
          const randomVal = Math.floor(Math.random() * 40) + 30;
          const nextData = [...prev.slice(1), {
            id: nextId,
            value: randomVal,
            time: "now"
          }];
          
          // Re-index history times
          return nextData.map((d, index) => {
            const age = nextData.length - 1 - index;
            return {
              ...d,
              time: age === 0 ? "now" : `${age * (samplingRate / 1000)}s`
            };
          });
        });
      }, samplingRate);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, samplingRate]);

  useEffect(() => {
    if (data.length) {
      const total = data.reduce((acc, curr) => acc + curr.value, 0);
      setMetricSum(Math.round(total / data.length));
    }
  }, [data]);

  const triggerSpike = () => {
    setSpikeDetected(true);
    setData(prev => {
      const nextId = prev.length ? prev[prev.length - 1].id + 1 : 0;
      const spikeVal = Math.floor(Math.random() * 30) + 90; // High value
      const nextData = [...prev.slice(1), {
        id: nextId,
        value: spikeVal,
        time: "now"
      }];
      return nextData.map((d, index) => {
        const age = nextData.length - 1 - index;
        return { ...d, time: age === 0 ? "now" : `${age * (samplingRate / 1000)}s` };
      });
    });
    setTimeout(() => setSpikeDetected(false), 2000);
  };

  const maxValue = 120;

  return (
    <div className="bg-surface-container p-4 border border-outline-variant rounded-xl text-on-surface font-sans">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <div>
          <span className="text-xs uppercase font-mono tracking-wider text-primary">Live Subsystem Telemetry</span>
          <h4 className="font-headline font-medium text-lg">Hyperion Data Feed</h4>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant rounded-lg transition-colors text-on-surface text-xs flex items-center gap-1.5"
            title={isPlaying ? "Pause Stream" : "Resume Stream"}
          >
            {isPlaying ? <Pause size={14} className="text-error" /> : <Play size={14} className="text-tertiary" />}
            <span className="font-mono">{isPlaying ? "PAUSE" : "PLAY"}</span>
          </button>
          <button 
            onClick={triggerSpike}
            className="p-1.5 bg-primary-container text-on-primary-container hover:bg-primary/20 border border-primary/30 rounded-lg transition-colors text-xs flex items-center gap-1.5 font-mono"
          >
            <Zap size={14} />
            <span>INJECT SPIKE</span>
          </button>
        </div>
      </div>

      {/* Chart visualization */}
      <div className="relative h-44 bg-surface-container-lowest border border-outline-variant/50 rounded-lg p-2 flex items-end gap-1.5 overflow-hidden">
        {data.map((d, i) => {
          const heightPercent = (d.value / maxValue) * 100;
          const isHigh = d.value > 80;
          return (
            <div key={d.id} className="flex-1 flex flex-col items-center h-full justify-end group">
              <div className="text-[9px] font-mono opacity-0 group-hover:opacity-100 transition-opacity mb-1 text-on-surface-variant">
                {d.value}
              </div>
              <div 
                style={{ height: `${heightPercent}%` }}
                className={`w-full rounded-t transition-all duration-300 ${
                  isHigh 
                    ? "bg-gradient-to-t from-error-container to-error animate-pulse" 
                    : "bg-gradient-to-t from-primary/30 to-primary"
                }`}
              />
              <span className="text-[8px] font-mono text-on-surface-variant truncate mt-1 w-full text-center">
                {d.time}
              </span>
            </div>
          );
        })}
        {spikeDetected && (
          <div className="absolute inset-0 bg-error/5 flex items-center justify-center border border-error/20 pointer-events-none animate-pulse">
            <span className="font-mono text-xs text-error font-medium flex items-center gap-1.5 bg-surface-container-lowest/90 px-3 py-1.5 rounded-full border border-error/30 shadow-lg">
              <AlertCircle size={12} /> TELEMETRY CRITICAL EVENT: FREQUENCY SPIKE DETECTED
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3 mt-4">
        <div className="bg-surface-container-low p-2 rounded-lg border border-outline-variant/30 text-center">
          <span className="text-[10px] text-on-surface-variant block uppercase tracking-wider font-mono">Mean Load</span>
          <span className="text-xl font-mono font-medium text-primary">{metricSum} <span className="text-xs font-sans text-on-surface-variant">Hz</span></span>
        </div>
        <div className="bg-surface-container-low p-2 rounded-lg border border-outline-variant/30 text-center">
          <span className="text-[10px] text-on-surface-variant block uppercase tracking-wider font-mono">Sampling</span>
          <select 
            value={samplingRate} 
            onChange={(e) => setSamplingRate(Number(e.target.value))}
            className="bg-transparent border-none text-xs font-mono font-medium text-tertiary focus:ring-0 cursor-pointer text-center mx-auto block py-0.5"
          >
            <option value="500">500ms</option>
            <option value="1000">1.0s</option>
            <option value="2000">2.0s</option>
            <option value="4000">4.0s</option>
          </select>
        </div>
        <div className="bg-surface-container-low p-2 rounded-lg border border-outline-variant/30 text-center">
          <span className="text-[10px] text-on-surface-variant block uppercase tracking-wider font-mono">Telemetry Queue</span>
          <span className="text-xl font-mono font-medium text-on-surface">OK</span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. KINETIC WALLET CURRENCY SWAP SIMULATOR
// ==========================================
export function WalletDemo() {
  const [fromToken, setFromToken] = useState("ETH");
  const [toToken, setToToken] = useState("USDC");
  const [amount, setAmount] = useState("1.0");
  const [isSwapping, setIsSwapping] = useState(false);
  const [swapStep, setSwapStep] = useState(0);
  const [swapHistory, setSwapHistory] = useState<{ id: string; tx: string; status: string }[]>([]);

  const rates: { [key: string]: number } = {
    ETH: 3240.50,
    MATIC: 0.85,
    SOL: 145.20,
    USDC: 1.00
  };

  const handleSwapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
  };

  const fromRate = rates[fromToken] || 1;
  const toRate = rates[toToken] || 1;
  const calculatedOutput = ((Number(amount) || 0) * fromRate) / toRate;

  const triggerSwap = () => {
    if (!amount || Number(amount) <= 0) return;
    setIsSwapping(true);
    setSwapStep(1);

    setTimeout(() => {
      setSwapStep(2); // Estimating Gas & Path Routing
      setTimeout(() => {
        setSwapStep(3); // Broadcast transaction
        setTimeout(() => {
          const txHash = "0x" + Array.from({ length: 8 }, () => Math.floor(Math.random() * 16).toString(16)).join("") + "..." + Array.from({ length: 4 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
          setSwapHistory(prev => [
            {
              id: Date.now().toString(),
              tx: `Swap ${amount} ${fromToken} → ${calculatedOutput.toFixed(2)} ${toToken}`,
              status: txHash
            },
            ...prev.slice(0, 3)
          ]);
          setIsSwapping(false);
          setSwapStep(0);
        }, 1200);
      }, 1000);
    }, 800);
  };

  return (
    <div className="bg-surface-container p-4 border border-outline-variant rounded-xl text-on-surface font-sans">
      <span className="text-xs uppercase font-mono tracking-wider text-secondary">Web3 Client Sandbox</span>
      <h4 className="font-headline font-medium text-lg mb-4">Atomic Asset Swapping</h4>

      <div className="space-y-3 relative">
        {/* From token box */}
        <div className="bg-surface-container-lowest p-3 border border-outline-variant/60 rounded-lg">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-on-surface-variant uppercase font-mono">Pay From</span>
            <span className="text-xs text-on-surface-variant font-mono">Bal: ~14.50</span>
          </div>
          <div className="flex justify-between items-center">
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={isSwapping}
              className="bg-transparent border-none text-xl font-mono focus:ring-0 outline-none w-2/3 text-on-surface"
              placeholder="0.0"
            />
            <select 
              value={fromToken}
              onChange={(e) => {
                setFromToken(e.target.value);
                if (e.target.value === toToken) setToToken(fromToken);
              }}
              disabled={isSwapping}
              className="bg-surface-container-high border border-outline-variant/60 text-xs rounded px-2 py-1 font-mono cursor-pointer"
            >
              <option value="ETH">ETH</option>
              <option value="SOL">SOL</option>
              <option value="MATIC">MATIC</option>
              <option value="USDC">USDC</option>
            </select>
          </div>
        </div>

        {/* Swap visual separator arrow */}
        <div className="flex justify-center -my-1 absolute left-1/2 top-[42%] -translate-x-1/2 z-10">
          <button 
            onClick={handleSwapTokens}
            disabled={isSwapping}
            className="p-1.5 bg-surface border border-outline-variant rounded-full text-secondary hover:text-primary transition-colors disabled:opacity-50"
          >
            <ArrowRightLeft size={14} className="rotate-90" />
          </button>
        </div>

        {/* To token box */}
        <div className="bg-surface-container-lowest p-3 border border-outline-variant/60 rounded-lg pt-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-on-surface-variant uppercase font-mono">Receive To</span>
            <span className="text-xs text-on-surface-variant font-mono">Bal: ~482.02</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-xl font-mono text-on-surface/80">
              {Number(amount) ? calculatedOutput.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 5 }) : "0.00"}
            </div>
            <select 
              value={toToken}
              onChange={(e) => {
                setToToken(e.target.value);
                if (e.target.value === fromToken) setFromToken(toToken);
              }}
              disabled={isSwapping}
              className="bg-surface-container-high border border-outline-variant/60 text-xs rounded px-2 py-1 font-mono cursor-pointer"
            >
              <option value="USDC">USDC</option>
              <option value="ETH">ETH</option>
              <option value="SOL">SOL</option>
              <option value="MATIC">MATIC</option>
            </select>
          </div>
        </div>

        {isSwapping ? (
          <div className="p-3 bg-surface-container-low border border-outline-variant/40 rounded-lg space-y-2">
            <div className="flex items-center gap-2 justify-between">
              <span className="text-xs font-mono font-medium text-secondary animate-pulse">
                {swapStep === 1 && "1/3 Resolving Dynamic Rates..."}
                {swapStep === 2 && "2/3 Optimizing Routing Path..."}
                {swapStep === 3 && "3/3 Broadcasting Cryptographic TX..."}
              </span>
              <RefreshCw size={12} className="text-secondary animate-spin" />
            </div>
            <div className="w-full bg-surface-container-lowest h-1.5 rounded-full overflow-hidden">
              <div 
                style={{ width: `${(swapStep / 3) * 100}%` }}
                className="bg-secondary h-full transition-all duration-300"
              />
            </div>
          </div>
        ) : (
          <button 
            onClick={triggerSwap}
            disabled={!amount || Number(amount) <= 0}
            className="w-full py-2.5 bg-gradient-to-r from-secondary-container to-secondary text-white font-headline font-medium text-sm rounded-lg hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer flex justify-center items-center gap-1.5"
          >
            <span>Execute Cryptographic Swap</span>
          </button>
        )}
      </div>

      {swapHistory.length > 0 && (
        <div className="mt-4 pt-3 border-t border-outline-variant/40">
          <span className="text-[10px] text-on-surface-variant block uppercase tracking-wider font-mono mb-2">Block Ledger (Local Demo Tx)</span>
          <div className="space-y-1.5">
            {swapHistory.map(h => (
              <div key={h.id} className="flex justify-between items-center text-xs font-mono bg-surface-container-lowest px-2 py-1.5 rounded border border-outline-variant/20">
                <span className="text-on-surface/95 text-xs truncate max-w-[160px]">{h.tx}</span>
                <span className="text-tertiary text-[10px] flex items-center gap-1">
                  <Check size={10} /> {h.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 3. NEXUS API ORCHESTRATOR REQUEST BUILDER
// ==========================================
export function NexusDemo() {
  const [method, setMethod] = useState<"GET" | "POST" | "PUT" | "DELETE">("GET");
  const [endpoint, setEndpoint] = useState("/users/nmudgal/artifacts");
  const [loading, setLoading] = useState(false);
  const [latency, setLatency] = useState<number | null>(null);
  const [response, setResponse] = useState<string | null>(null);

  const triggerRequest = () => {
    setLoading(true);
    setResponse(null);
    setLatency(null);

    const startTime = performance.now();
    setTimeout(() => {
      const endTime = performance.now();
      const elapsed = Math.round(endTime - startTime);
      setLatency(elapsed);

      let payload: object = {};
      if (method === "GET") {
        payload = {
          status: "SUCCESS",
          client: "Nexus API Orchestrator",
          resource: endpoint,
          timestamp: new Date().toISOString(),
          data: {
            architect: "Nishant Mudgal",
            credentials: ["React 19", "Next.js", "Web Security"],
            location: "Bengaluru, IN",
            artifacts: [
              { name: "Hyperion Analytics", compression: "Gzip (38.4KB)" },
              { name: "Kinetic Wallet UI", bundle: "9.2KB" }
            ]
          },
          telemetry: {
            roundtrip_lat_ms: elapsed,
            edge_cache: "HIT_CLOUD_RUN",
            optimized: true
          }
        };
      } else {
        payload = {
          status: "MUTATED_SUCCESS",
          action: method,
          target: endpoint,
          timestamp: new Date().toISOString(),
          state: "COMMIT_ACKNOWLEDGED",
          telemetry: {
            latency_ms: elapsed,
            transaction_secured: true
          }
        };
      }

      setResponse(JSON.stringify(payload, null, 2));
      setLoading(false);
    }, Math.floor(Math.random() * 400) + 180); // Realistic network wait
  };

  return (
    <div className="bg-surface-container p-4 border border-outline-variant rounded-xl text-on-surface font-sans">
      <span className="text-xs uppercase font-mono tracking-wider text-primary">API Sandbox</span>
      <h4 className="font-headline font-medium text-lg mb-3">Nexus Payload Optimizer</h4>

      <div className="space-y-3">
        <div className="flex gap-2">
          <select 
            value={method} 
            onChange={(e) => setMethod(e.target.value as any)}
            className="bg-surface-container-lowest border border-outline-variant/60 rounded px-2.5 py-1.5 text-xs font-mono text-tertiary cursor-pointer focus:outline-none"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
          <input 
            type="text" 
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            className="bg-surface-container-lowest border border-outline-variant/60 rounded px-2.5 py-1.5 text-xs font-mono text-on-surface flex-1 focus:outline-none focus:border-primary/50"
          />
          <button 
            onClick={triggerRequest}
            disabled={loading}
            className="bg-primary text-on-primary font-mono text-xs px-4 py-1.5 rounded hover:bg-primary-container hover:text-on-primary-container font-semibold transition-colors disabled:opacity-50"
          >
            {loading ? "SENDING..." : "SEND"}
          </button>
        </div>

        {loading && (
          <div className="h-36 bg-surface-container-lowest border border-outline-variant/40 rounded-lg flex items-center justify-center">
            <div className="text-center space-y-2">
              <RefreshCw className="animate-spin text-primary mx-auto" size={20} />
              <p className="text-xs font-mono text-on-surface-variant">Resolving compiler route...</p>
            </div>
          </div>
        )}

        {response && !loading && (
          <div className="space-y-2 animate-fadeIn">
            <div className="flex justify-between items-center text-xs font-mono px-1">
              <span className="text-on-surface-variant">Response Status: <span className="text-tertiary font-bold">200 OK</span></span>
              <span className="text-primary font-medium">Latency: {latency}ms</span>
            </div>
            <pre className="text-[10px] font-mono text-on-surface-variant bg-surface-container-lowest border border-outline-variant/40 p-3 rounded-lg overflow-x-auto max-h-44 text-left leading-relaxed">
              <code>{response}</code>
            </pre>
          </div>
        )}

        {!response && !loading && (
          <div className="h-36 bg-surface-container-lowest border border-outline-variant/40 rounded-lg flex flex-col items-center justify-center text-center p-4">
            <Info size={20} className="text-outline mb-1.5" />
            <p className="text-xs text-on-surface-variant">No active query session</p>
            <p className="text-[10px] text-outline mt-0.5">Click SEND to request simulated architectural routes.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 4. PRISM SHADERS TRIGONOMETRIC CANVAS
// ==========================================
export function PrismCanvasDemo() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [particleCount, setParticleCount] = useState(120);
  const [speed, setSpeed] = useState(1.5);
  const [connectionDistance, setConnectionDistance] = useState(80);
  const [hue, setHue] = useState(195); // Cyan color default

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = 180);

    // Particle class
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * speed;
        this.vy = (Math.random() - 0.5) * speed;
        this.size = Math.random() * 1.5 + 1;
      }

      update() {
        this.x += this.vx * speed;
        this.y += this.vy * speed;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, 100%, 75%, 0.8)`;
        ctx.fill();
      }
    }

    let particles = Array.from({ length: particleCount }, () => new Particle());

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || 400;
      height = canvas.height = 180;
      particles = Array.from({ length: particleCount }, () => new Particle());
    };

    window.addEventListener("resize", handleResize);

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.25;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(${hue}, 100%, 70%, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      const isLight = document.body.classList.contains("light");
      ctx.fillStyle = isLight ? "rgba(248, 250, 252, 0.9)" : "rgba(5, 5, 5, 0.9)";
      ctx.fillRect(0, 0, width, height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      drawConnections();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [particleCount, speed, connectionDistance, hue]);

  return (
    <div className="bg-surface-container p-4 border border-outline-variant rounded-xl text-on-surface font-sans">
      <span className="text-xs uppercase font-mono tracking-wider text-tertiary">Trigonometric WebGL Core</span>
      <h4 className="font-headline font-medium text-lg mb-3">Kinetic Math Shader Playground</h4>

      <div className="relative rounded-lg overflow-hidden border border-outline-variant/40 bg-surface-container-lowest h-[180px] w-full">
        <canvas ref={canvasRef} className="block w-full h-full" />
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="space-y-2">
          <label className="text-[10px] text-on-surface-variant font-mono block uppercase">Particles: {particleCount}</label>
          <input 
            type="range" 
            min="20" 
            max="160" 
            value={particleCount} 
            onChange={(e) => setParticleCount(Number(e.target.value))}
            className="w-full accent-tertiary cursor-pointer h-1 bg-surface-container-lowest rounded-full"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] text-on-surface-variant font-mono block uppercase">Hue Vector: {hue}°</label>
          <input 
            type="range" 
            min="0" 
            max="360" 
            value={hue} 
            onChange={(e) => setHue(Number(e.target.value))}
            className="w-full accent-tertiary cursor-pointer h-1 bg-surface-container-lowest rounded-full"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] text-on-surface-variant font-mono block uppercase">Speed Coefficient: {speed}x</label>
          <input 
            type="range" 
            min="0.5" 
            max="4.0" 
            step="0.1"
            value={speed} 
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-full accent-tertiary cursor-pointer h-1 bg-surface-container-lowest rounded-full"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] text-on-surface-variant font-mono block uppercase">Link Radius: {connectionDistance}px</label>
          <input 
            type="range" 
            min="30" 
            max="150" 
            value={connectionDistance} 
            onChange={(e) => setConnectionDistance(Number(e.target.value))}
            className="w-full accent-tertiary cursor-pointer h-1 bg-surface-container-lowest rounded-full"
          />
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. BUNDLE SIZE OPTIMIZATION TUNING SIMULATOR
// ==========================================
export function PerformanceTuningSimulator() {
  const [codeSplitting, setCodeSplitting] = useState(false);
  const [treeShaking, setTreeShaking] = useState(false);
  const [gzipCompression, setGzipCompression] = useState(false);
  const [imageWebp, setImageWebp] = useState(false);
  const [networkSpeed, setNetworkSpeed] = useState<"3G" | "4G" | "WiFi">("4G");

  // Calculations
  const baseSize = 420; // KB
  let sizeReduction = 0;
  if (codeSplitting) sizeReduction += 120;
  if (treeShaking) sizeReduction += 90;
  if (gzipCompression) sizeReduction += 130;
  if (imageWebp) sizeReduction += 50;

  const currentSize = Math.max(30, baseSize - sizeReduction);

  // Speed multiplier
  const speeds = {
    "3G": 120, // KB/s
    "4G": 850, // KB/s
    "WiFi": 4000 // KB/s
  };

  const speedKbps = speeds[networkSpeed];
  const downloadTimeSec = currentSize / speedKbps;
  const lighthouseScore = Math.min(100, Math.round(50 + (sizeReduction / 390) * 49 + (networkSpeed === "WiFi" ? 1 : 0)));

  return (
    <div className="bg-surface-container p-4 border border-outline-variant rounded-xl text-on-surface font-sans">
      <div className="flex items-center gap-1.5 mb-2">
        <Cpu size={16} className="text-primary" />
        <span className="text-xs uppercase font-mono tracking-wider text-primary">Compiler Sandbox</span>
      </div>
      <h4 className="font-headline font-medium text-lg mb-1">Bundle Tuning Panel</h4>
      <p className="text-xs text-on-surface-variant mb-4">Toggle optimization metrics to inspect virtual bundle performance on variable networks.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Toggle options */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between p-2.5 bg-surface-container-lowest border border-outline-variant/40 rounded-lg hover:border-primary/30 transition-colors">
            <div>
              <span className="text-xs font-semibold block text-on-surface font-headline">Dynamic Code Splitting</span>
              <span className="text-[10px] text-on-surface-variant block">Chunks routes on demand</span>
            </div>
            <button 
              onClick={() => setCodeSplitting(!codeSplitting)}
              className={`w-9 h-5 rounded-full relative transition-colors ${codeSplitting ? "bg-primary" : "bg-outline-variant"}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 bg-surface rounded-full transition-all ${codeSplitting ? "left-4.5" : "left-0.5"}`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-surface-container-lowest border border-outline-variant/40 rounded-lg hover:border-primary/30 transition-colors">
            <div>
              <span className="text-xs font-semibold block text-on-surface font-headline">Dead Code Elimination (Tree Shaking)</span>
              <span className="text-[10px] text-on-surface-variant block">Stripped unused export blocks</span>
            </div>
            <button 
              onClick={() => setTreeShaking(!treeShaking)}
              className={`w-9 h-5 rounded-full relative transition-colors ${treeShaking ? "bg-primary" : "bg-outline-variant"}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 bg-surface rounded-full transition-all ${treeShaking ? "left-4.5" : "left-0.5"}`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-surface-container-lowest border border-outline-variant/40 rounded-lg hover:border-primary/30 transition-colors">
            <div>
              <span className="text-xs font-semibold block text-on-surface font-headline">Gzip / Brotli Compression</span>
              <span className="text-[10px] text-on-surface-variant block">Compresses raw textual vectors</span>
            </div>
            <button 
              onClick={() => setGzipCompression(!gzipCompression)}
              className={`w-9 h-5 rounded-full relative transition-colors ${gzipCompression ? "bg-primary" : "bg-outline-variant"}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 bg-surface rounded-full transition-all ${gzipCompression ? "left-4.5" : "left-0.5"}`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-surface-container-lowest border border-outline-variant/40 rounded-lg hover:border-primary/30 transition-colors">
            <div>
              <span className="text-xs font-semibold block text-on-surface font-headline">Lossless WebP Image Pipelines</span>
              <span className="text-[10px] text-on-surface-variant block">Minifies layout assets</span>
            </div>
            <button 
              onClick={() => setImageWebp(!imageWebp)}
              className={`w-9 h-5 rounded-full relative transition-colors ${imageWebp ? "bg-primary" : "bg-outline-variant"}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 bg-surface rounded-full transition-all ${imageWebp ? "left-4.5" : "left-0.5"}`} />
            </button>
          </div>
        </div>

        {/* Results layout */}
        <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant flex flex-col justify-between">
          <div className="space-y-4">
            {/* Gauge */}
            <div className="flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-on-surface-variant">Lighthouse Performance</span>
                <div className="text-3xl font-mono font-medium text-tertiary">{lighthouseScore}/100</div>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-outline-variant/30 flex items-center justify-center relative overflow-hidden">
                <div 
                  className={`absolute inset-0 border-4 rounded-full transition-all duration-500 ${
                    lighthouseScore > 90 ? "border-tertiary" : lighthouseScore > 70 ? "border-primary" : "border-error"
                  }`} 
                  style={{ clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 ${lighthouseScore}%)` }} 
                />
                <span className="text-[10px] font-mono font-bold z-10">{lighthouseScore}</span>
              </div>
            </div>

            {/* Metrics */}
            <div className="space-y-1.5 border-t border-outline-variant/30 pt-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-on-surface-variant font-mono">Bundle Weight:</span>
                <span className="font-mono text-on-surface font-semibold">{currentSize} KB <span className="text-on-surface-variant text-[10px]">({Math.round(((baseSize - currentSize) / baseSize) * 100)}% optimized)</span></span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-on-surface-variant font-mono">Download Time:</span>
                <span className="font-mono text-on-surface font-semibold">{downloadTimeSec.toFixed(3)}s</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-on-surface-variant font-mono">Target Network Profile:</span>
                <div className="flex gap-1.5">
                  {(["3G", "4G", "WiFi"] as const).map(n => (
                    <button 
                      key={n}
                      onClick={() => setNetworkSpeed(n)}
                      className={`px-2 py-0.5 rounded text-[9px] font-mono border transition-colors ${networkSpeed === n ? "bg-primary/20 text-primary border-primary/50" : "bg-surface-container-high border-outline-variant/30 hover:border-outline-variant/60 text-on-surface-variant"}`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex gap-1.5 bg-surface-container-high/60 p-2 rounded-lg border border-outline-variant/20 items-start">
            <Sparkles size={14} className="text-tertiary shrink-0 mt-0.5" />
            <p className="text-[10px] text-on-surface-variant leading-relaxed">
              {lighthouseScore >= 95 
                ? "Perfect metrics! This app fulfills all enterprise web core vitals criteria."
                : "Tuning bundle sizing minimizes Time to Interactive (TTI) and maximizes accessibility rankings."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
