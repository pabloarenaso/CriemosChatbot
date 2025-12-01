# Design Guidelines: Criemos WhatsApp Web-Style Chat Application

## Design Approach
**Reference-Based: WhatsApp Web** - This application directly emulates WhatsApp Web's proven chat interface, optimized for a customer service chatbot experience.

## Visual Identity & Branding
- Clean, minimal interface following WhatsApp Web aesthetic
- Header displays "Criemos" brand name (text-based logo for now) with "Asistente Virtual" subtitle
- Professional customer service tone with friendly assistant personality

## Color Palette
- **User Messages**: #DCF8C6 (WhatsApp green)
- **Bot Messages**: White (#FFFFFF)
- **Background**: #E5DDD5 (WhatsApp beige with subtle pattern)
- **Text**: Dark gray/black for readability
- **Accent**: Standard WhatsApp green for send button and active states

## Layout System
- **Desktop**: Chat container centered, max-width ~1000px, full height
- **Mobile**: Full-width, full-height responsive layout
- **Spacing**: Use Tailwind units of 2, 4, and 6 for consistent padding (p-2, p-4, p-6)
- **Message spacing**: 2-4 units between bubbles for breathing room

## Typography
- **Header/Brand**: Bold, 16-18px for "Criemos", regular 12-14px for subtitle
- **Messages**: 14-15px regular weight for body text
- **Timestamps**: 11-12px, lighter gray color
- **Quick reply buttons**: 14px medium weight

## Component Structure

### Header Section
- Fixed at top, white background
- Logo/brand name on left
- Subtitle centered or below brand name
- Clean separation line/shadow below header

### Chat Area
- Full height minus header and input
- Scrollable content area
- WhatsApp-style subtle background pattern (#E5DDD5)
- Auto-scroll to latest message on new content

### Message Bubbles
- **User (right-aligned)**: Green background (#DCF8C6), rounded corners (12-16px), max-width 70%, padding 8-12px
- **Bot (left-aligned)**: White background, same rounded corners, max-width 70%, padding 8-12px, subtle shadow
- **Timestamps**: Small text below/inside each bubble, right-aligned for user, left-aligned for bot
- **Spacing**: 8-12px vertical gap between messages

### Welcome Message
- Automatically displayed on first load
- "¡Hola! 👋 Soy el asistente de Criemos. ¿En qué puedo ayudarte?"
- Bot-style bubble (white, left-aligned)

### Quick Reply Buttons
- Displayed after welcome message
- Three buttons: "Ver mochilas", "Consultar envíos", "Hablar con asesor"
- Rounded pill-style buttons, outlined or filled with brand color
- Horizontally arranged on desktop, stack on mobile
- 8-12px padding, clear tap targets (minimum 44px height)

### Typing Indicator
- Displayed on bot side when processing response
- WhatsApp-style animated dots
- "escribiendo..." text with subtle animation

### Input Area
- Fixed at bottom
- White background with top border/shadow
- Text input: Rounded corners, border, placeholder "Escribe un mensaje..."
- Send button: Icon (paper plane/arrow), positioned right, circular or rounded square
- Enter key triggers send
- Padding 12-16px around input elements

## Responsive Behavior
- **Desktop**: Chat centered, comfortable width, full viewport height
- **Mobile**: Edge-to-edge layout, optimized for touch, full screen experience
- Quick reply buttons stack vertically on narrow screens
- Message bubbles maintain max 85-90% width on mobile

## Interaction Patterns
- Smooth scroll animation when new messages appear
- Clear focus states on input field
- Button hover states (slightly darker/elevated)
- Disabled send button when input is empty
- Visual feedback when message is sent (immediate bubble appearance)

## Technical Requirements
- Chat history persisted in localStorage
- Unique session ID per user (web_[random])
- Webhook integration sends: `{ "user_id": "web_[random]", "text": "mensaje", "channel": "webchat" }`
- Messages load from localStorage on page refresh

## Images
No hero images or decorative imagery required. This is a functional chat interface focused on clean, efficient communication. The WhatsApp-style background pattern is the only visual texture needed.