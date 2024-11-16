import { databases, storage } from '@/services/context/AuthContext';
import { ID } from 'appwrite';

export const saveFormData = async (formData: any,userId: string) => {
  try {

    let reportFileId = '';

    if (formData.latestReport) {
      const file = formData.latestReport;

      console.log('Uploading file:', file);

      try {
        const fileId = ID.unique();
        const reportUpload = await storage.createFile(
          '67323ce8001f56508367',
          fileId,                 
          file,           
        );

        reportFileId = reportUpload.$id;
        console.log('File uploaded successfully with ID:', reportFileId);

        
      } catch (uploadError) {
        console.error('Error uploading file:', uploadError);
        alert('Failed to upload file.');
        return;
      }
    } else {
      console.warn('No file found for latestReport in formData.');
    }

    const newDocument = await databases.createDocument(
      '67322db0002747477ca7',
      '67322dc600131bf5b628', 
      userId,
      {
        age: parseInt(formData.age, 10),
        profession: formData.profession,
        jobHours: parseInt(formData.jobHours, 10),
        checkupFrequency: formData.checkupFrequency,
        report: reportFileId, 
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
