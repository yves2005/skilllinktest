import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const PdfService = {
    generateProjectReport: (userName, projectsData) => {
        const doc = new jsPDF();
        
        doc.setFontSize(18);
        doc.text('Récapitulatif des Projets', 14, 22);
        
        doc.setFontSize(11);
        doc.setTextColor(100);
        doc.text(`Généré pour: ${userName} - ${new Date().toLocaleDateString()}`, 14, 30);
        
        autoTable(doc, {
            startY: 40,
            head: [['Projet', 'Client', 'Statut', 'Montant']],
            body: projectsData,
            theme: 'grid',
            headStyles: { fillColor: [79, 70, 229] },
        });
        
        doc.save('resume-projets.pdf');
    }
};
