import jsPDF from 'jspdf';

export const generateHeaderPDF = (doc: jsPDF) => {
    doc.setFont('VisbyRoundCF', 'bold');
    doc.setFontSize(18);
    doc.text("Página Personal", 120, 20);
}
