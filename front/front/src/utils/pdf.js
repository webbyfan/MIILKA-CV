import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function exportElementToPdf(element, fileName) {
  if (!element) {
    throw new Error("PDF export element is not available.");
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: "#ffffff",
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight,
    logging: false,
    letterRendering: true,
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  const pageHeight = pdf.internal.pageSize.getHeight();

  let position = 0;
  pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);

  let remainingHeight = pdfHeight - pageHeight;
  while (remainingHeight > 0) {
    position -= pageHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
    remainingHeight -= pageHeight;
  }

  pdf.save(fileName);
}
