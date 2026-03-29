---
description: Recommended workflow for optimizing images
---

When adding new local images to the project:

1. **Format**: Use **WebP** for the best balance of quality and file size.
2. **Naming**: Use descriptive, lowercase names with hyphens (e.g., `seaside-sunset-view.webp`).
3. **Dimensions**:
   - Hero images: 1920px width.
   - Component/Grid images: 800px width.
4. **Implementation**:
   - Use `object-fit: cover` to prevent stretching.
   - Always include an `alt` attribute for SEO and screen readers.
5. **Placeholder Fallback**: 
   - If a specific image isn't available, use the `generate_image` tool or a high-quality Unsplash URL as a temporary placeholder.
