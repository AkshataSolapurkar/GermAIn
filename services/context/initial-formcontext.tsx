import { databases, storage } from '@/services/context/AuthContext';
import { ID } from 'appwrite';

export const saveFormData = async (formData: any) => {
  try {
    // Upload the report file to Appwrite Storage if it exists
    let reportFileId = '';
    if (formData.latestReport) {
      const file = formData.latestReport;
      const fileId = ID.unique();
      const reportUpload = await storage.createFile('67323ce8001f56508367', fileId, file);
      reportFileId = fileId;
    }

    // Save form data as a new document in Appwrite database
    const newDocument = await databases.createDocument(
      '67322db0002747477ca7',
      '67322dc600131bf5b628',
      ID.unique(),
      {
        age: parseInt(formData.age, 10),
        profession: formData.profession,
        jobHours: parseInt(formData.jobHours) ,
        checkupFrequency: formData.checkupFrequency,
        report : reportFileId,
        clinicalIssues: formData.clinicalIssues,
        periodDates: formData.periodDates,
        regularity: formData.regularity,
        reportVerified: formData.reportVerified,
      }
    );

    console.log('Data saved successfully:', newDocument);
    alert('Data saved successfully!');
  } catch (error) {
    console.error('Error saving data:', error);
    alert('Failed to save data.');
  }
};