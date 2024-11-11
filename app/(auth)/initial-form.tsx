import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import RNPickerSelect from 'react-native-picker-select'; // Import react-native-picker-select
import { Checkbox } from 'react-native-paper'; // Import Checkbox from react-native-paper
import { saveFormData } from '@/services/context/initial-formcontext';
import { useAuth } from '@/services/context/AuthContext';
import { useRouter } from 'expo-router'; // Assuming you have AuthContext for user session

const HealthForm = () => {
  const router = useRouter()
  const [age, setAge] = useState('');
  const [profession, setProfession] = useState('');
  const [jobHours, setJobHours] = useState('');
  const [checkupFrequency, setCheckupFrequency] = useState('');
  const [report, setLatestReport] = useState(null);
  const [clinicalIssues, setClinicalIssues] = useState('');
  const [periodDates, setPeriodDates] = useState('');
  const [regularity, setPeriodRegularity] = useState(false);
  const [reportVerified, setReportVerified] = useState(false);

  const { user } = useAuth(); // Get the user session
  
  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setLatestReport(result);
    } catch (error) {
      console.warn('File selection canceled', error);
    }
  };

  const handleSubmit = async () => {
    if (!reportVerified) {
      alert("You must verify that the uploaded report is authentic.");
      return;
    }

    // Call the function to store data in Appwrite
    await saveFormData({
      age,
      profession,
      jobHours,
      checkupFrequency,
      report,
      clinicalIssues,
      periodDates,
      regularity,
      reportVerified,
    });
    router.push("/(dashpage)/dashboard")
    
  };

  return (
    <View>
      <Text>Age:</Text>
      <TextInput value={age} onChangeText={setAge} keyboardType="number-pad" />

      <Text>Profession:</Text>
      <RNPickerSelect
        onValueChange={setProfession}
        items={[
          { label: 'Student', value: 'student' },
          { label: 'Mother', value: 'mother' },
          { label: 'Housewife', value: 'housewife' },
          { label: '9-5', value: '9-5' },
          { label: 'Freelancer', value: 'freelancer' },
          { label: 'Other', value: 'other' },
        ]}
      />
      
      {profession === 'other' && (
        <TextInput placeholder="Please specify" onChangeText={setProfession} />
      )}

      <Text>Job Hours:</Text>
      <TextInput value={jobHours} onChangeText={setJobHours} keyboardType="number-pad" />

      <Text>How often do you do a body checkup?</Text>
      <RNPickerSelect
        onValueChange={setCheckupFrequency}
        items={[
          { label: 'Monthly', value: 'monthly' },
          { label: 'Every 3 Months', value: '3months' },
          { label: 'Every 6 Months', value: '6months' },
          { label: 'Every 12 Months', value: '12months' },
        ]}
      />

      <Button title="Upload Latest Report" onPress={handleFileUpload} />

      <Text>Do you have any clinically diagnosed problems?</Text>
      <TextInput placeholder="e.g., Diabetes, BP" value={clinicalIssues} onChangeText={setClinicalIssues} />

      <Text>Period Dates:</Text>
      <TextInput placeholder="Specify dates" value={periodDates} onChangeText={setPeriodDates} />

      <Text>How regular are your periods?</Text>
      <Checkbox
        status={regularity ? 'checked' : 'unchecked'}
        onPress={() => setPeriodRegularity(!regularity)}
      />

      <Text>Verify the report is authentic</Text>
      <Checkbox
        status={reportVerified ? 'checked' : 'unchecked'}
        onPress={() => setReportVerified(!reportVerified)}
      />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default HealthForm;
