# 🧠 Viral Mind

**Viral Mind** is an AI-powered content strategy engine engineered to maximize organic reach and viewer retention on YouTube and Facebook. 

Unlike generic AI writers, **Viral Mind** acts as a "Click Engineer," generating cinematic hooks, psychologically-driven titles, and engagement-focused descriptions designed to trigger algorithmic growth.

## 🚀 Key Features

- **Algorithmic Strategy Generation**: Creates platform-specific tactics (YouTube vs Facebook) optimized for retention and clicks.
- **Cinematic Titles**: Generates titles with high emotional impact using proven viral structures (e.g., "The Price of...", "What No One Saw...").
- **Engagement Hooks**: diverse description styles that end with "stance-inviting" questions to provoke comments.
- **Neobrutalist UI**: A high-contrast, bold interface designed for rapid workflow and clarity.
- **Strict JSON Output**: Robust backend parsing ensures data integrity and consistent formatting.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS v4 (Neobrutalism)
- **AI**: Google Gemini API (`gemini-2.5-flash`)
- **Database**: Supabase (Strategy History)
- **Icons**: Lucide React

## 📦 Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/viral-mind.git
    cd viral-mind
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up environment variables (`.env.local`):
    ```env
    GEMINI_API_KEY=your_gemini_api_key
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
    ```

4.  Run the development server:
    ```bash
    npm run dev
    ```

## 🤝 Contribution

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
