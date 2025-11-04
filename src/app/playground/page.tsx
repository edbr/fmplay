"use client";

import { motion } from "framer-motion";
import { useState, useMemo, JSX } from "react";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Bell, Heart, Star, Camera, Zap } from "lucide-react";

export default function MotionPlayground() {
  // === Animation State ===
  const [playKey, setPlayKey] = useState(0);
  const [category, setCategory] = useState("basics");
  const [animation, setAnimation] = useState("fade");
  const [duration, setDuration] = useState(0.8);
  const [delay, setDelay] = useState(0);
  const [ease, setEase] = useState("easeInOut");
  const [repeat, setRepeat] = useState(0);
  const [repeatType, setRepeatType] = useState<
    "loop" | "reverse" | "mirror"
  >("loop");
  const [stiffness, setStiffness] = useState(120);

  // === Style State ===
  const [buttonColor, setButtonColor] = useState("#EFFF4F");
  const [buttonText, setButtonText] = useState("Click Me");
  const [borderRadius, setBorderRadius] = useState(20);
  const [blur, setBlur] = useState(12);
  const [shadow, setShadow] = useState(0.2);
  const [fontSize, setFontSize] = useState(16);
  const [glassMode, setGlassMode] = useState(false);
  const [iconRotateSpeed, setIconRotateSpeed] = useState(1.5);
  const [iconName, setIconName] = useState("bell");

  // === Icons ===
  const iconMap: Record<string, JSX.Element> = {
    bell: <Bell className="w-5 h-5" />,
    heart: <Heart className="w-5 h-5" />,
    star: <Star className="w-5 h-5" />,
    camera: <Camera className="w-5 h-5" />,
    zap: <Zap className="w-5 h-5" />,
  };

  const easeMap: Record<string, any> = {
    easeIn: [0.42, 0, 1, 1],
    easeOut: [0, 0, 0.58, 1],
    easeInOut: [0.42, 0, 0.58, 1],
    anticipate: "anticipate",
  };

  const defaultAnimations = {
    basics: "fade",
    physics: "spring",
    advanced: "stagger",
  } as const;

  const textColor = useMemo(() => {
    const rgb = parseInt(buttonColor.slice(1), 16);
    const r = (rgb >> 16) & 255;
    const g = (rgb >> 8) & 255;
    const b = rgb & 255;
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.6 ? "#000" : "#fff";
  }, [buttonColor]);

  // === Variants ===
  const variants = useMemo(() => {
    switch (animation) {
      case "fade":
        return { initial: { opacity: 0 }, animate: { opacity: 1 } };
      case "slide":
        return {
          initial: { x: -100, opacity: 0 },
          animate: { x: 0, opacity: 1 },
        };
      case "scale":
        return { initial: { scale: 0.5 }, animate: { scale: 1 } };
      case "rotate":
        return {
          initial: { rotate: -90, opacity: 0 },
          animate: { rotate: 0, opacity: 1 },
        };
      case "bounce":
        return { initial: { y: -100 }, animate: { y: [0, -30, 0] } };
      case "flip":
        return {
          initial: { rotateY: 180, opacity: 0 },
          animate: { rotateY: 0, opacity: 1 },
        };
      case "spring":
        return { initial: { scale: 0.8 }, animate: { scale: 1 } };
      case "stagger":
        return { initial: {}, animate: {} };
      case "morph":
        return {
          initial: { borderRadius: "0%" },
          animate: { borderRadius: "50%" },
        };
      default:
        return { initial: { opacity: 0 }, animate: { opacity: 1 } };
    }
  }, [animation]);

  const transitionConfig =
    animation === "spring"
      ? { type: "spring" as const, stiffness, delay, duration }
      : {
          type: "tween" as const,
          duration,
          delay,
          ease: easeMap[ease],
          repeat,
          repeatType,
        };

  // === Code Snippet (with icon dynamic) ===
  const codeSnippet = `
<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
  <motion.button
    initial={${JSON.stringify(variants.initial)}}
    animate={${JSON.stringify(variants.animate)}}
    transition={${JSON.stringify(transitionConfig)}}
    style={{
      backgroundColor: "${glassMode ? `${buttonColor}30` : buttonColor}",
      color: "${textColor}",
      borderRadius: "${borderRadius}px",
      backdropFilter: "${glassMode ? `blur(${blur}px)` : "none"}",
      boxShadow: "0 4px 10px rgba(0,0,0,${shadow})",
      fontSize: "${fontSize}px",
      border: "${glassMode ? `1px solid rgba(255,255,255,0.4)` : "none"}",
      transition: "all 0.3s ease"
    }}
    className="relative px-8 py-3 font-medium select-none flex items-center gap-2 justify-center"
  >
    <motion.div
      animate={{ rotate: [0, -20, 20, -15, 15, -10, 10, -5, 5, 0] }}
      transition={{ duration: 1.5, ease: "easeInOut", repeat: 0 }}
    >
      <${iconName.charAt(0).toUpperCase() + iconName.slice(1)} className="w-5 h-5" />
    </motion.div>
    ${buttonText}
  </motion.button>
</motion.div>
`.trim();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeSnippet);
    toast.success("Copied to clipboard!");
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row gap-8 p-8 bg-background text-foreground">
      {/* LEFT PANEL */}
      <div className="w-full md:w-1/3 space-y-6 border border-border p-6 rounded-xl bg-muted/20 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-2">🎛 Controls</h2>

        {/* Tabs for animation categories */}
        <Tabs
          defaultValue="basics"
          value={category}
          onValueChange={(val) => {
            setCategory(val);
            setAnimation(
              defaultAnimations[val as keyof typeof defaultAnimations]
            );
          }}
        >
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="basics">Basics</TabsTrigger>
            <TabsTrigger value="physics">Physics</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="basics" className="space-y-3">
            <Select value={animation} onValueChange={setAnimation}>
              <SelectTrigger>
                <SelectValue placeholder="Select animation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fade">Fade</SelectItem>
                <SelectItem value="slide">Slide</SelectItem>
                <SelectItem value="scale">Scale</SelectItem>
                <SelectItem value="rotate">Rotate</SelectItem>
              </SelectContent>
            </Select>
          </TabsContent>

          <TabsContent value="physics" className="space-y-3">
            <Select value={animation} onValueChange={setAnimation}>
              <SelectTrigger>
                <SelectValue placeholder="Select animation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bounce">Bounce</SelectItem>
                <SelectItem value="spring">Spring</SelectItem>
                <SelectItem value="flip">Flip</SelectItem>
              </SelectContent>
            </Select>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-3">
            <Select value={animation} onValueChange={setAnimation}>
              <SelectTrigger>
                <SelectValue placeholder="Select animation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stagger">Stagger</SelectItem>
                <SelectItem value="morph">Morph</SelectItem>
              </SelectContent>
            </Select>
          </TabsContent>
        </Tabs>

        {/* Animation controls */}
        <div>
          <label className="text-sm font-medium">Ease</label>
          <Select value={ease} onValueChange={setEase}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easeIn">easeIn</SelectItem>
              <SelectItem value="easeOut">easeOut</SelectItem>
              <SelectItem value="easeInOut">easeInOut</SelectItem>
              <SelectItem value="anticipate">anticipate</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium">
            Duration: {duration.toFixed(1)}s
          </label>
          <Slider
            min={0.1}
            max={3}
            step={0.1}
            value={[duration]}
            onValueChange={(v) => setDuration(v[0])}
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            Delay: {delay.toFixed(1)}s
          </label>
          <Slider
            min={0}
            max={2}
            step={0.1}
            value={[delay]}
            onValueChange={(v) => setDelay(v[0])}
          />
        </div>

        {animation === "spring" && (
          <div>
            <label className="text-sm font-medium">
              Stiffness: {stiffness}
            </label>
            <Slider
              min={50}
              max={400}
              step={10}
              value={[stiffness]}
              onValueChange={(v) => setStiffness(v[0])}
            />
          </div>
        )}

        {/* === Style Controls === */}
        <h3 className="text-md font-semibold pt-4 border-t border-border">
          🎨 Style Controls
        </h3>

        <div>
          <label className="text-sm font-medium">Button Label</label>
          <input
            type="text"
            value={buttonText}
            onChange={(e) => setButtonText(e.target.value)}
            className="w-full mt-1 rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        {/* Icon Picker */}
        <div>
          <label className="text-sm font-medium">Icon</label>
          <Select value={iconName} onValueChange={setIconName}>
            <SelectTrigger>
              <SelectValue placeholder="Select icon" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bell">Bell</SelectItem>
              <SelectItem value="heart">Heart</SelectItem>
              <SelectItem value="star">Star</SelectItem>
              <SelectItem value="camera">Camera</SelectItem>
              <SelectItem value="zap">Zap</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium">Button Color</label>
          <input
            type="color"
            value={buttonColor}
            onChange={(e) => setButtonColor(e.target.value)}
            className="mt-2 h-8 w-full cursor-pointer rounded-md border border-border bg-transparent"
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            Border Radius: {borderRadius}px
          </label>
          <Slider
            min={0}
            max={50}
            step={1}
            value={[borderRadius]}
            onValueChange={(v) => setBorderRadius(v[0])}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Blur: {blur}px</label>
          <Slider
            min={0}
            max={30}
            step={1}
            value={[blur]}
            onValueChange={(v) => setBlur(v[0])}
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            Shadow: {shadow.toFixed(2)}
          </label>
          <Slider
            min={0}
            max={0.5}
            step={0.05}
            value={[shadow]}
            onValueChange={(v) => setShadow(v[0])}
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            Font Size: {fontSize}px
          </label>
          <Slider
            min={10}
            max={24}
            step={1}
            value={[fontSize]}
            onValueChange={(v) => setFontSize(v[0])}
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={glassMode}
            onChange={(e) => setGlassMode(e.target.checked)}
          />
          <label className="text-sm font-medium">Glass Mode</label>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="relative flex-1 bg-card rounded-2xl shadow-sm border border-border p-10 flex flex-col items-center justify-center space-y-8">
        <Button
          onClick={() => setPlayKey((k) => k + 1)}
          variant="outline"
          className="absolute top-6 right-6 z-10"
        >
          ▶ Play
        </Button>

        {/* Preview */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
          <motion.button
            key={`${animation}-${playKey}`}
            initial={variants.initial}
            animate={variants.animate}
            transition={transitionConfig}
            style={{
              backgroundColor: glassMode
                ? `${buttonColor}30`
                : buttonColor,
              color: textColor,
              borderRadius: `${borderRadius}px`,
              backdropFilter: glassMode ? `blur(${blur}px)` : undefined,
              WebkitBackdropFilter: glassMode
                ? `blur(${blur}px)`
                : undefined,
              boxShadow: `0 4px 10px rgba(0,0,0,${shadow})`,
              fontSize: `${fontSize}px`,
              border: glassMode
                ? `1px solid rgba(255,255,255,0.4)`
                : "none",
              transition: "all 0.3s ease",
            }}
            className="relative px-8 py-3 font-medium select-none flex items-center gap-2 justify-center"
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{
                rotate: [0, -20, 20, -15, 15, -10, 10, -5, 5, 0],
              }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: 0,
              }}
            >
              {iconMap[iconName]}
            </motion.div>
            {buttonText}
          </motion.button>
        </motion.div>

        {/* Code Block */}
        <div className="relative w-full mt-6 rounded-lg border border-border bg-muted/20 overflow-hidden group">
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 z-10 px-2 py-1 text-xs text-muted-foreground hover:text-foreground bg-card/80 backdrop-blur-sm border border-border rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Copy
          </button>
          <SyntaxHighlighter
            language="tsx"
            style={oneLight}
            customStyle={{
              margin: 0,
              padding: "1rem",
              background: "transparent",
              fontSize: "0.8rem",
              whiteSpace: "pre-wrap",
            }}
          >
            {codeSnippet}
          </SyntaxHighlighter>
        </div>
      </div>
    </main>
  );
}
