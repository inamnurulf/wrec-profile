"use client";

import React, { useState, useCallback } from "react";

// (keep your jsPDF/html2canvas commented imports as-is)

export default function ArticlePdfButton({
  article,
  minutes,
  fmtID,
  children = "Unduh PDF",
  ...buttonProps
}) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPDF = useCallback(async () => {
    if (!article) return;

    setIsGenerating(true);

    try {
      const container = document.createElement("div");
      container.style.position = "absolute";
      container.style.left = "-9999px";
      container.style.width = "800px";
      container.style.background = "white";
      container.style.padding = "40px";
      document.body.appendChild(container);

      // keep your simple markdown → HTML conversion
      const contentHtml = article.content
        ? article.content
            .replace(/^### (.*$)/gim, "<h3>$1</h3>")
            .replace(/^## (.*$)/gim, "<h2>$1</h2>")
            .replace(/^# (.*$)/gim, "<h1>$1</h1>")
            .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
            .replace(/\*(.*)\*/gim, "<em>$1</em>")
            .replace(/\n/gim, "<br>")
        : "";

      const styles = `
        :root {
          --ink: #111827;           /* slate-900 */
          --muted: #6b7280;         /* gray-500 */
          --border: #e5e7eb;        /* gray-200 */
          --accent: #10b981;        /* emerald-500 */
          --bg-soft: #f9fafb;       /* gray-50 */
        }
        * { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; }
        body { font-family: Georgia, "Times New Roman", Times, serif; color: var(--ink); }
        .doc { color: var(--ink); line-height: 1.7; font-size: 14.5px; }
        .title { font-size: 32px; font-weight: 700; letter-spacing: -0.01em; margin: 0 0 6px; color: #000; }
        .meta { color: var(--muted); font-size: 12.5px; display: flex; flex-wrap: wrap; gap: 10px; padding-bottom: 14px; border-bottom: 1px solid var(--border); margin-bottom: 18px; }
        .tags { display: flex; flex-wrap: wrap; gap: 8px; margin: 14px 0 2px; }
        .tag { display: inline-block; background: var(--accent); color: #fff; padding: 4px 10px; border-radius: 999px; font-size: 11px; font-weight: 600; }
        .hero { width: 100%; max-height: 420px; object-fit: cover; border-radius: 10px; margin: 18px 0; }
        .summary { font-size: 15px; background: var(--bg-soft); border-left: 4px solid var(--accent); padding: 14px 16px; margin: 18px 0; }
        .content { font-size: 14.5px; }
        .content h1, .content h2, .content h3 { color: #0b0b0b; line-height: 1.25; margin: 22px 0 8px; }
        .content h1 { font-size: 26px; border-bottom: 1px solid var(--border); padding-bottom: 6px; }
        .content h2 { font-size: 22px; }
        .content h3 { font-size: 18px; }
        .content p, .content br { margin: 10px 0; }
        .content strong { font-weight: 700; }
        .content em { font-style: italic; }
        .content blockquote {
          margin: 14px 0; padding: 10px 14px; background: #fafafa;
          border-left: 4px solid var(--border); color: #374151;
        }
        .content code {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono","Courier New", monospace;
          font-size: 12.5px; background: #f3f4f6; padding: 2px 6px; border-radius: 6px;
        }
        img, blockquote, .summary { break-inside: avoid; page-break-inside: avoid; }
        .content h2, .content h3 { page-break-after: avoid; }
        /* Print tweaks */
        @media print {
          @page { size: A4; margin: 18mm 14mm; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .tag { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .doc { font-size: 12.8px; }
        }
      `;

      // Build HTML with embedded styles (pure styling; same logic/fields)
      container.innerHTML = `
        <style>${styles}</style>
        <div class="doc">
          <h1 class="title">${article.title || ""}</h1>

          <div class="meta">
            ${article.author ? `<span>Penulis: ${article.author}</span>` : ""}
            ${
              article.published_at
                ? `<span>Tanggal: ${fmtID(article.published_at)}</span>`
                : ""
            }
            <span>${minutes} menit baca</span>
            ${
              typeof article.views === "number"
                ? `<span>${article.views.toLocaleString("id-ID")} views</span>`
                : ""
            }
          </div>

          ${
            article.tags && article.tags.length
              ? `<div class="tags">${article.tags
                  .map((t) => `<span class="tag">${t}</span>`)
                  .join("")}</div>`
              : ""
          }

          ${
            article.hero
              ? `<img class="hero" src="${article.hero}" alt="${
                  article.title || "Hero"
                }">`
              : ""
          }

          ${
            article.summary
              ? `<div class="summary">${article.summary}</div>`
              : ""
          }

          <div class="content">
            ${contentHtml}
          </div>
        </div>
      `;

      // Wait for images
      const images = container.getElementsByTagName("img");
      await Promise.all(
        Array.from(images).map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          });
        })
      );

      // === Keep your jsPDF/html2canvas block commented exactly as before ===
      /*
      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        logging: false
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(\`\${article.title.replace(/[^a-z0-9]/gi, '_')}.pdf\`);
      */

      // TEMP fallback (unchanged logic, just better styles in head)
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <title>${article.title || "Artikel"}</title>
              <style>
                ${styles}
                body { max-width: 800px; margin: 0 auto; padding: 20px; }
              </style>
            </head>
            <body>${container.innerHTML}</body>
          </html>
        `);
        printWindow.document.close();
        printWindow.onload = () => {
          setTimeout(() => printWindow.print(), 500);
        };
      }

      document.body.removeChild(container);
      setIsGenerating(false);
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Gagal membuat PDF. Silakan coba lagi.");
      setIsGenerating(false);
    }
  }, [article, minutes, fmtID]);

  return (
    <button
      type="button"
      onClick={handleDownloadPDF}
      disabled={isGenerating}
      className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium shadow-sm transition-colors
    ${
      isGenerating
        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
        : "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
    }`}
      {...buttonProps}
    >
      {isGenerating ? "Membuat PDF…" : children}
    </button>
  );
}
