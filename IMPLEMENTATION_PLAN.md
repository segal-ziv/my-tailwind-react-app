# Accessibility Widget - Complete Implementation Plan

## Phase 1: Core Structure & State Management

### 1.1 Update State Interface
```typescript
interface AccessibilityPreferences {
  // Intelligence Assistance
  gridNavigation: boolean
  keyboardNavigation: boolean
  screenReaderMode: boolean
  voiceCommands: boolean
  textToSpeech: boolean
  specialKeyNavigation: boolean  // disabled feature

  // Font size (0-5 scale)
  fontSize: number

  // Visibility Adjustments
  brightContrast: boolean
  darkContrast: boolean
  monochrome: boolean
  invertedColors: boolean
  highSaturation: boolean
  lowSaturation: boolean

  // Color customization
  colorTarget: 'backgrounds' | 'headings' | 'contents'
  customColorHue: number  // 0-360

  // Font Adjustments
  fontAdjustmentType: 'size' | 'wordSpacing' | 'letterSpacing'
  fontSizeLevel: number  // 0-5
  wordSpacingLevel: number  // 0-5
  letterSpacingLevel: number  // 0-5

  // Cursor
  cursorColor: 'white' | 'black'
  cursorSize: 'normal' | 'large' | 'extra-large'

  // Content Features
  enlargeDisplay: boolean
  subtitles: boolean
  blockFlashing: boolean
  highlightLinks: boolean
  imageDescriptions: boolean
  readableFont: boolean
  enlargeContent: boolean
  readingView: boolean
  highlightHeadings: boolean
  focusReading: boolean
  muteMedia: boolean
  pageStructure: boolean
  virtualKeyboard: boolean
  dictionary: boolean
  readingGuide: boolean
}
```

---

## Phase 2: Widget Header Implementation

### 2.1 Language Selector
- Display: "עברית" with Israel flag icon
- Functionality: Switch between Hebrew and English interface
- Implementation: Toggle state, update all UI text

### 2.2 Info Button
- Icon: Question mark (?)
- Functionality: Show tooltip or modal with usage instructions
- Implementation: Tooltip/modal component

### 2.3 Audio Toggle
- Icon: Speaker/mute icon
- Functionality: Global audio enable/disable for all sound features
- Implementation: Master audio toggle

### 2.4 Close Button
- Icon: X
- Functionality: Close widget panel
- Implementation: setIsOpen(false)

---

## Phase 3: Intelligence Assistance Features

### 3.1 Font Size Controls (Top Section)
**Current Issue:** Using generic controls, need specific +/- buttons

**Implementation:**
```typescript
// Three distinct buttons in a row
<div className="flex items-center justify-between px-6 py-4">
  <button
    onClick={() => decreaseFontSize()}
    className="w-12 h-12 bg-blue-700 text-white rounded-lg"
  >
    −
  </button>

  <div className="text-center">
    <div className="font-medium">פרופיל נגישות</div>
    <div className="text-sm text-gray-600">רמה {fontSize}</div>
  </div>

  <button
    onClick={() => increaseFontSize()}
    className="w-12 h-12 bg-blue-700 text-white rounded-lg"
  >
    +
  </button>
</div>
```

### 3.2 Grid Navigation (ניווט אוזרים)
**Purpose:** Grid-based keyboard navigation
**CSS Class:** `.grid-navigation`
**Implementation:**
- Add visual grid overlay on page
- Enable tab navigation through grid cells
- Highlight active cell

### 3.3 Keyboard Navigation (ניווט מקלדת)
**Purpose:** Enhanced keyboard shortcuts
**Implementation:**
- Add keyboard event listeners
- Show keyboard shortcuts overlay (press ?)
- Enable quick navigation keys (1-9 for sections)

### 3.4 Screen Reader Mode (התאמה לקורא-מסך)
**Purpose:** Optimize for screen readers
**CSS Class:** `.screen-reader-optimized`
**Implementation:**
- Add more ARIA labels
- Remove decorative elements
- Simplify layout
- Add skip links

### 3.5 Voice Commands (פקודת קוליות)
**Purpose:** Voice control
**Implementation:**
- Use Web Speech Recognition API
- Commands: "scroll down", "click button", "read page"
- Visual feedback when listening
- Hebrew command support

### 3.6 Text Reading (הקראת טקסט)
**Purpose:** Read text aloud
**Implementation:**
- Use Web Speech Synthesis API
- Click any text to hear it
- Control panel: play, pause, stop, speed
- Hebrew voice selection

### 3.7 Special Key Navigation
**Status:** DISABLED
**Display:** Grayed out with disabled styling
**Reason:** Feature not available yet

---

## Phase 4: Visibility Adjustments

### 4.1 Bright Contrast (נגישודיות בהירה)
**CSS Implementation:**
```css
.bright-contrast {
  filter: contrast(150%) brightness(110%);
}
.bright-contrast * {
  background-color: white !important;
  color: #000 !important;
  border-color: #000 !important;
}
```

### 4.2 Dark Contrast (נגישודיות כהה)
**CSS Implementation:**
```css
.dark-contrast {
  background-color: #000 !important;
  color: #fff !important;
}
.dark-contrast * {
  background-color: #000 !important;
  color: #fff !important;
  border-color: #fff !important;
}
```

### 4.3 Monochrome (מונוכרום)
**CSS Implementation:**
```css
.monochrome {
  filter: grayscale(100%);
}
```

### 4.4 Inverted Colors (מוד נגישודיות)
**CSS Implementation:**
```css
.inverted-colors {
  filter: invert(1) hue-rotate(180deg);
}
```

### 4.5 High/Low Saturation
**CSS Implementation:**
```css
.high-saturation {
  filter: saturate(200%);
}
.low-saturation {
  filter: saturate(50%);
}
```

### 4.6 Color Picker System
**Implementation:**
```typescript
// Three tabs: backgrounds, headings, contents
const [colorTarget, setColorTarget] = useState('backgrounds')
const [hue, setHue] = useState(0)

// Apply based on target
if (colorTarget === 'backgrounds') {
  document.documentElement.style.setProperty(
    '--custom-bg-color',
    `hsl(${hue}, 70%, 50%)`
  )
}
```

**CSS:**
```css
.custom-color-backgrounds * {
  background-color: var(--custom-bg-color) !important;
}
.custom-color-headings h1, h2, h3, h4, h5, h6 {
  color: var(--custom-heading-color) !important;
}
.custom-color-contents p, div {
  color: var(--custom-content-color) !important;
}
```

---

## Phase 5: Content Adjustments

### 5.1 Font Adjustment Tabs
**Three Tabs:** Font Size, Word Spacing, Letter Spacing

**Implementation:**
```typescript
const [fontAdjustType, setFontAdjustType] = useState('size')
const [sizeLevel, setSizeLevel] = useState(0)
const [wordSpaceLevel, setWordSpaceLevel] = useState(0)
const [letterSpaceLevel, setLetterSpaceLevel] = useState(0)

// Apply based on active tab
switch(fontAdjustType) {
  case 'size':
    root.style.fontSize = `${100 + (sizeLevel * 10)}%`
    break
  case 'wordSpacing':
    root.style.wordSpacing = `${wordSpaceLevel * 0.1}em`
    break
  case 'letterSpacing':
    root.style.letterSpacing = `${letterSpaceLevel * 0.05}em`
    break
}
```

### 5.2 Cursor Controls
**Two buttons:** White, Black
**Purpose:** Change cursor color

**CSS:**
```css
.cursor-white * {
  cursor: url('data:image/svg+xml,...white cursor...'), auto;
}
.cursor-black * {
  cursor: url('data:image/svg+xml,...black cursor...'), auto;
}
```

### 5.3 Enlarge Display (הגדלת תצוגה)
**Implementation:**
```css
.enlarge-display {
  zoom: 1.5;
}
```

### 5.4 Subtitles (תוסף לכותבים)
**Implementation:**
- Show captions for videos
- Generate live captions using speech recognition
- Beta feature indicator

### 5.5 Block Flashing (חסימת הבהובים)
**CSS:**
```css
.block-flashing *,
.block-flashing *::before,
.block-flashing *::after {
  animation: none !important;
  transition: none !important;
}
```

### 5.6 Highlight Links (הדגשת קישורים)
**CSS:**
```css
.highlight-links a {
  background-color: yellow !important;
  color: #000 !important;
  font-weight: bold !important;
  padding: 2px 4px !important;
  border: 2px solid #000 !important;
}
```

### 5.7 Image Descriptions (תיאור לתמונות)
**Implementation:**
- Show alt text as overlay on hover
- Display permanent captions below images
```javascript
document.querySelectorAll('img').forEach(img => {
  const alt = img.alt
  const caption = document.createElement('div')
  caption.textContent = alt
  caption.className = 'image-description'
  img.parentElement.appendChild(caption)
})
```

### 5.8 Readable Font (גופן קריא)
**CSS:**
```css
.readable-font * {
  font-family: Arial, Helvetica, sans-serif !important;
}
```

### 5.9 Enlarge Content (הגדלת תכנים)
**Implementation:**
- Increase size of specific content elements
- Different from whole page zoom
```css
.enlarge-content p,
.enlarge-content li,
.enlarge-content div {
  font-size: 120% !important;
  line-height: 1.8 !important;
}
```

### 5.10 Reading View (תצוגה קריאה)
**Implementation:**
- Simplify page to show only main content
- Hide navigation, sidebars, ads
```css
.reading-view nav,
.reading-view aside,
.reading-view .sidebar,
.reading-view .ads {
  display: none !important;
}
.reading-view main {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}
```

### 5.11 Highlight Headings (הדגשת כותרות)
**CSS:**
```css
.highlight-headings h1,
.highlight-headings h2,
.highlight-headings h3,
.highlight-headings h4,
.highlight-headings h5,
.highlight-headings h6 {
  background-color: #ffeb3b !important;
  color: #000 !important;
  padding: 8px 12px !important;
  border-left: 4px solid #f57c00 !important;
  margin: 16px 0 !important;
}
```

### 5.12 Focus Reading (מיקוד קריאה)
**Implementation:**
- Dim everything except current paragraph
- Highlight active paragraph
```css
.focus-reading p {
  opacity: 0.3;
  transition: opacity 0.3s;
}
.focus-reading p:hover,
.focus-reading p:focus-within {
  opacity: 1;
  background-color: rgba(255, 255, 0, 0.2);
}
```

### 5.13 Mute Media (השתק מדיה)
**JavaScript:**
```javascript
document.querySelectorAll('video, audio').forEach(media => {
  media.muted = true
  media.pause()
})
```

### 5.14 Page Structure (מבנה העמוד)
**Implementation:**
- Show outline/table of contents
- Number all headings
```css
.page-structure h1::before { content: '1. '; }
.page-structure h2::before { content: '1.1. '; }
```

### 5.15 Virtual Keyboard (מקלדת וירטואלית)
**Implementation:**
- Create on-screen keyboard component
- Hebrew layout support
- Click keys to type

### 5.16 Dictionary (מילון)
**Implementation:**
- Double-click word to show definition
- Tooltip with definition
- Hebrew dictionary API integration

### 5.17 Reading Guide (מדריך קריאה)
**Implementation:**
- Horizontal line that follows cursor vertically
```javascript
const guide = document.createElement('div')
guide.className = 'reading-guide'
document.addEventListener('mousemove', (e) => {
  guide.style.top = `${e.clientY}px`
})
```

**CSS:**
```css
.reading-guide {
  position: fixed;
  left: 0;
  right: 0;
  height: 50px;
  background: rgba(255, 255, 0, 0.3);
  border: 2px solid #ffeb3b;
  border-left: none;
  border-right: none;
  pointer-events: none;
  z-index: 9998;
  transform: translateY(-50%);
}
```

---

## Phase 6: Footer Buttons

### 6.1 Cancel Accessibility (ביטול נגישות)
**Implementation:**
```typescript
const resetAll = () => {
  setPreferences(defaultPreferences)
  document.documentElement.className = ''
  localStorage.removeItem('accessibility-preferences-v2')
}
```

### 6.2 Accessibility Statement (הצהרת נגישות)
**Implementation:**
```typescript
<Link to="/accessibility-statement" onClick={() => setIsOpen(false)}>
  הצהרת נגישות
</Link>
```

### 6.3 Send Feedback (שלח משוב)
**Implementation:**
- Open feedback modal
- Contact form with fields:
  - Name
  - Email
  - Feedback type (bug, suggestion, compliment)
  - Message
- Send to email or save to database

---

## Phase 7: Visual State Management

### Active State Styling
```css
.feature-card.active {
  background-color: #374151 !important;
  color: white !important;
}

.feature-card.inactive {
  background-color: white;
  color: #1e40af;
  border: 2px solid #e5e7eb;
}

.feature-card.disabled {
  background-color: #f3f4f6;
  color: #9ca3af;
  cursor: not-allowed;
  opacity: 0.6;
}
```

---

## Phase 8: Testing Checklist

### Functionality Tests
- [ ] All 30+ features can be toggled on/off
- [ ] Settings persist across page refreshes
- [ ] Multiple features can be active simultaneously
- [ ] No conflicts between features
- [ ] Reset button clears all settings

### Visual Tests
- [ ] Active state shows dark background
- [ ] Inactive state shows white background
- [ ] Disabled features are grayed out
- [ ] Icons are visible and correct
- [ ] Hebrew text displays correctly (RTL)

### Accessibility Tests
- [ ] Keyboard navigation works (Tab, Enter, Space, Escape)
- [ ] Screen reader announces all controls
- [ ] Focus indicators are visible
- [ ] ARIA labels are correct
- [ ] Color contrast meets WCAG AA

### Browser Tests
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### Device Tests
- [ ] Desktop (1920x1080)
- [ ] Tablet (768px)
- [ ] Mobile (375px)

---

## Implementation Priority Order

1. **Critical (Must Have):**
   - Font size controls
   - Contrast modes (bright, dark, inverted, monochrome)
   - Highlight links/headings
   - Text-to-speech
   - Reading guide
   - Block animations

2. **Important (Should Have):**
   - Color picker system
   - Font/word/letter spacing controls
   - Cursor customization
   - Readable font
   - Page structure
   - Mute media
   - Image descriptions

3. **Nice to Have:**
   - Voice commands
   - Virtual keyboard
   - Dictionary
   - Grid navigation
   - Subtitles (beta)

4. **Future Enhancements:**
   - Language switcher (Hebrew/English UI)
   - Feedback form
   - Usage analytics
   - Profile saving/loading
