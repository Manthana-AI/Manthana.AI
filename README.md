# Manthana AI

Manthana AI draws inspiration from the ancient Sanskrit story of Samudra Manthana (समुद्र मंथन) - the churning of the cosmic ocean. Just as the devas and asuras churned the cosmic ocean to extract amrita (the nectar of immortality), Manthana AI churns through your documents to extract valuable insights and knowledge.

## What is Manthana AI?

Manthana AI is a powerful document analysis tool that combines the capabilities of local Large Language Models (LLMs) with advanced Retrieval-Augmented Generation (RAG) technology. It enables you to have meaningful conversations with your documents while keeping your data secure and private by running entirely on your local machine.

## Key Features

- Local First: All processing happens on your machine, ensuring complete privacy and data security.
- Multi-Document Analysis: Upload and analyze multiple documents simultaneously.
- Context-Aware Responses: Get precise answers that incorporate context from your documents.
- Smart Chunking: Advanced document segmentation for optimal knowledge retrieval.
- Intuitive Interface: Clean, modern UI inspired by the cosmic churning theme.
- Real-time Processing: See the churning process as your documents are analyzed.
- Flexible File Support: Supports PDF, DOCX, and TXT files.

## Core Components

### Kalasha (Knowledge Repository)
The Kalasha component, named after the vessel that held the cosmic ocean, serves as your document repository. It manages:
- Document storage and organization.
- File type validation and processing.
- Real-time upload status tracking.

### Samudra (Vector Store)
The Samudra component, representing the cosmic ocean itself, handles:
- Document chunking and embedding generation.
- Vector similarity search.
- Context retrieval for question answering.

### Amrita (Knowledge Extraction)
The Amrita component, named after the nectar of immortality, delivers:
- Context-aware responses.
- Natural language question answering.
- Document-grounded insights.

## Installation

### Prerequisites
1. Ollama Executable: The **Ollama executable file should be placed in src-tauri/binaries/.
2. Required Models: Ensure you have the necessary models stored in src-tauri/binaries/ollama/models.
3. Install dependencies:
   sh
   npm install
   cargo build
   

### Running Manthana AI
To start the application, run:
sh
npm run tauri dev


To build a release version:
sh
npm run tauri build


## License
Manthana AI is released under the *MIT License with Common Clause*. You are free to use it for personal and commercial purposes, but redistribution in a way that directly competes with the original product is restricted. See the [LICENSE](LICENSE) file for more details.

---

Made with ❤ and inspired by ancient wisdom!
