# 📱 Swipe Gestures Guide - Framer Motion

## What I've Implemented

Your gallery now supports **swipe gestures** on touch devices! Here's what works:

✅ Swipe left/right to navigate between images
✅ Visual feedback during drag (opacity, rotation)
✅ Swipe direction indicators
✅ Navigation buttons with disabled states
✅ Image counter display

---

## 🎯 Key Framer Motion APIs Used

### 1. **`drag` Prop**
```tsx
<motion.div drag="x">
```
- `drag="x"` - Only allows horizontal dragging
- `drag="y"` - Only vertical
- `drag={true}` - Allows dragging in both directions

### 2. **`dragConstraints`**
```tsx
dragConstraints={{ left: 0, right: 0 }}
```
- Limits how far the element can be dragged
- `{ left: 0, right: 0 }` means it snaps back to origin

### 3. **`dragElastic`**
```tsx
dragElastic={1}
```
- Controls the "rubberband" feeling
- `0` = no elasticity, `1` = maximum stretch

### 4. **`onDragEnd` Callback**
```tsx
onDragEnd={(e, info) => {
  const swipe = info.offset.x * info.velocity.x;
  if (swipe < -threshold) {
    // Swiped left
  } else if (swipe > threshold) {
    // Swiped right
  }
}}
```
- Fires when user releases the drag
- `info.offset.x` - Total distance dragged
- `info.velocity.x` - Speed of the drag

### 5. **`useMotionValue` & `useTransform`**
```tsx
const x = useMotionValue(0);
const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);
```
- `useMotionValue` - Creates an animated value
- `useTransform` - Maps one value to another
- Great for creating reactive animations during drag

---

## 🎨 Advanced Swipe Patterns

### Pattern 1: Card Stack (Tinder-style)
```tsx
const [cards, setCards] = useState([...images]);

<motion.div
  drag="x"
  dragConstraints={{ left: 0, right: 0 }}
  onDragEnd={(e, { offset, velocity }) => {
    const swipe = offset.x * velocity.x;
    
    if (swipe > 10000) {
      // Liked - swipe right
      removeCard();
    } else if (swipe < -10000) {
      // Disliked - swipe left
      removeCard();
    }
  }}
  exit={{ 
    x: 500, 
    opacity: 0, 
    rotate: 45,
    transition: { duration: 0.3 }
  }}
>
  {/* Card content */}
</motion.div>
```

### Pattern 2: Carousel with Snap Points
```tsx
const [[page, direction], setPage] = useState([0, 0]);
const imageIndex = wrap(0, images.length, page);

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

<AnimatePresence initial={false} custom={direction}>
  <motion.img
    key={page}
    src={images[imageIndex]}
    custom={direction}
    variants={variants}
    initial="enter"
    animate="center"
    exit="exit"
    drag="x"
    dragConstraints={{ left: 0, right: 0 }}
    dragElastic={1}
    onDragEnd={(e, { offset, velocity }) => {
      const swipe = offset.x * velocity.x;
      
      if (swipe < -10000) {
        paginate(1);
      } else if (swipe > 10000) {
        paginate(-1);
      }
    }}
  />
</AnimatePresence>
```

### Pattern 3: Pull-to-Refresh
```tsx
const y = useMotionValue(0);
const [isRefreshing, setIsRefreshing] = useState(false);

<motion.div
  drag="y"
  dragConstraints={{ top: 0, bottom: 0 }}
  dragElastic={0.5}
  style={{ y }}
  onDragEnd={(e, info) => {
    if (info.offset.y > 100 && info.velocity.y > 0) {
      setIsRefreshing(true);
      // Trigger refresh
      setTimeout(() => setIsRefreshing(false), 2000);
    }
  }}
>
  {isRefreshing && <Spinner />}
  {/* Content */}
</motion.div>
```

### Pattern 4: Swipe-to-Delete
```tsx
const [items, setItems] = useState([...]);

{items.map(item => (
  <motion.div
    key={item.id}
    drag="x"
    dragConstraints={{ left: -100, right: 100 }}
    onDragEnd={(e, { offset }) => {
      if (offset.x < -150) {
        // Delete item
        setItems(items.filter(i => i.id !== item.id));
      }
    }}
    layout
  >
    <motion.div 
      className="delete-indicator"
      style={{ opacity: useTransform(x, [-150, 0], [1, 0]) }}
    >
      🗑️ Delete
    </motion.div>
    {item.content}
  </motion.div>
))}
```

---

## 🔧 Touch-Specific Optimizations

### 1. Prevent Default Browser Behaviors
```tsx
<motion.div
  drag="x"
  onTouchStart={(e) => e.stopPropagation()}
  style={{ touchAction: 'pan-y' }} // Allow vertical scroll but prevent horizontal
>
```

### 2. Increase Touch Target Size
```tsx
// Make buttons easier to tap on mobile
<button className="min-h-[44px] min-w-[44px]">
  {/* Apple's minimum recommended touch target */}
</button>
```

### 3. Add Haptic Feedback (iOS)
```tsx
const triggerHaptic = () => {
  if (window.navigator.vibrate) {
    window.navigator.vibrate(10); // 10ms vibration
  }
};

<motion.div
  drag="x"
  onDragEnd={(e, info) => {
    if (Math.abs(info.offset.x) > 100) {
      triggerHaptic();
    }
  }}
>
```

### 4. Performance: Use `will-change`
```css
.draggable-element {
  will-change: transform;
}
```

---

## 📊 Pan vs Drag - When to Use What?

### Use `drag` when:
- You want the element to physically move on screen
- Building interactive UI (sliders, cards, drawers)
- Need visual feedback during interaction

### Use `onPan` when:
- You don't want the element to move
- Just detecting gesture direction
- Controlling something else based on swipe

```tsx
<motion.div
  onPan={(e, info) => {
    console.log(info.delta.x); // Movement since last frame
    console.log(info.offset.x); // Total movement
  }}
  onPanEnd={(e, info) => {
    // Gesture complete
  }}
>
```

---

## 🎯 Gesture Detection Thresholds

```tsx
// Current implementation
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

// Alternative: Simple distance threshold
if (Math.abs(info.offset.x) > 100) {
  // Swiped
}

// Alternative: Velocity-only
if (info.velocity.x > 500) {
  // Fast swipe right
}

// Alternative: Combined with direction
const isIntentionalSwipe = 
  Math.abs(info.offset.x) > 50 && 
  Math.abs(info.velocity.x) > 200;
```

---

## 🚀 Next Steps / Enhancements

### 1. Add Keyboard Navigation
```tsx
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
  };
  
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [currentIndex]);
```

### 2. Preload Adjacent Images
```tsx
useEffect(() => {
  // Preload next/previous images
  if (currentIndex < images.length - 1) {
    const img = new Image();
    img.src = `/${images[currentIndex + 1]}.webp`;
  }
  if (currentIndex > 0) {
    const img = new Image();
    img.src = `/${images[currentIndex - 1]}.webp`;
  }
}, [currentIndex]);
```

### 3. Add Pinch-to-Zoom
```tsx
<motion.div
  drag
  dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
  style={{ scale }}
  onWheel={(e) => {
    // Zoom with mouse wheel or trackpad pinch
    const newScale = scale.get() + e.deltaY * -0.01;
    scale.set(Math.min(Math.max(newScale, 1), 3));
  }}
>
```

### 4. Add Double-Tap to Zoom
```tsx
const [lastTap, setLastTap] = useState(0);
const [isZoomed, setIsZoomed] = useState(false);

<motion.div
  animate={{ scale: isZoomed ? 2 : 1 }}
  onTouchEnd={() => {
    const now = Date.now();
    if (now - lastTap < 300) {
      // Double tap detected
      setIsZoomed(!isZoomed);
    }
    setLastTap(now);
  }}
>
```

---

## 📱 Testing Swipes

### In Browser DevTools:
1. Open Chrome DevTools
2. Toggle device toolbar (Cmd+Shift+M)
3. Select a mobile device
4. Click and drag to simulate touch swipes

### On Real Device:
1. Run `npm run dev`
2. Find your local IP: `ifconfig | grep inet`
3. Access from phone: `http://YOUR_IP:3000`

---

## 🎨 Visual Feedback Ideas

```tsx
// Spring animation on release
transition={{ type: "spring", stiffness: 300, damping: 30 }}

// Blur effect while dragging
const blur = useTransform(x, [-100, 0, 100], [4, 0, 4]);
style={{ filter: `blur(${blur}px)` }}

// Scale down while dragging
const scale = useTransform(x, [-200, 0, 200], [0.9, 1, 0.9]);

// Background color change
const backgroundColor = useTransform(
  x, 
  [-200, 0, 200], 
  ['#ff0000', '#ffffff', '#00ff00']
);
```

---

Happy swiping! 🎉
