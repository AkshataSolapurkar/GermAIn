import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import RNPickerSelect from 'react-native-picker-select';
import { Checkbox } from 'react-native-paper';
import { saveFormData } from '@/services/context/initial-formcontext';
import { useAuth } from '@/services/context/AuthContext';
import { useRouter } from 'expo-router';

const HealthForm = () => {
  const router = useRouter();
  const [age, setAge] = useState('');
  const [profession, setProfession] = useState('');
  const [jobHours, setJobHours] = useState('');
  const [checkupFrequency, setCheckupFrequency] = useState('');
  const [report, setLatestReport] = useState<DocumentPickerResponse | null>(null);
  const [clinicalIssues, setClinicalIssues] = useState('');
  const [periodDates, setPeriodDates] = useState('');
  const [regularity, setPeriodRegularity] = useState(false);
  const [reportVerified, setReportVerified] = useState(false);

  const { user } = useAuth();

  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      if (result && result[0]) {
        setLatestReport(result[0]);
      }
    } catch (error) {
      console.warn('File selection canceled', error);
    }
  };

  const handleSubmit = async () => {
    if (!reportVerified) {
      alert("Please verify that the uploaded report is authentic.");
      return;
    }
    if (!report) {
      alert("Please upload a report file.");
      return;
    }

    const formData = {
      age,
      profession,
      jobHours,
      checkupFrequency,
      latestReport: report,
      clinicalIssues,
      periodDates,
      regularity,
      reportVerified,
    };

    try {
      await saveFormData(formData, user.id);
      router.push("/(dashpage)/dashboard");
    } catch (error) {
      console.error("Error saving form data:", error);
    }
  };

  const pickerSelectStyles = {
    inputIOS: styles.pickerInput,
    inputAndroid: styles.pickerInput,
  };

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={require('../../assets/images/loginimage.png')} 
        style={styles.decorativeImage}
      />
      
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Health Profile</Text>
        <Text style={styles.headerSubtitle}>
          Help us understand you better to provide personalized care
        </Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            value={age}
            onChangeText={setAge}
            keyboardType="number-pad"
            placeholder="Enter your age"
            placeholderTextColor="#666"
          />

          <Text style={styles.label}>Profession</Text>
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
            style={pickerSelectStyles}
            placeholder={{ label: 'Select your profession', value: null }}
          />

          {profession === 'other' && (
            <TextInput
              style={styles.input}
              placeholder="Please specify your profession"
              onChangeText={setProfession}
              placeholderTextColor="#666"
            />
          )}

          <Text style={styles.label}>Working Hours per Day</Text>
          <TextInput
            style={styles.input}
            value={jobHours}
            onChangeText={setJobHours}
            keyboardType="number-pad"
            placeholder="Enter working hours"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Health Information</Text>

          <Text style={styles.label}>Checkup Frequency</Text>
          <RNPickerSelect
            onValueChange={setCheckupFrequency}
            items={[
              { label: 'Monthly', value: 'monthly' },
              { label: 'Every 3 Months', value: '3months' },
              { label: 'Every 6 Months', value: '6months' },
              { label: 'Every 12 Months', value: '12months' },
            ]}
            style={pickerSelectStyles}
            placeholder={{ label: 'Select frequency', value: null }}
          />

          <TouchableOpacity style={styles.uploadButton} onPress={handleFileUpload}>
            <Text style={styles.uploadButtonText}>
              {report ? '📄 Report Uploaded' : '📎 Upload Latest Report'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.label}>Clinical Conditions</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="e.g., Diabetes, Blood Pressure"
            value={clinicalIssues}
            onChangeText={setClinicalIssues}
            multiline
            numberOfLines={3}
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Period Tracking</Text>

          <Text style={styles.label}>Last Period Dates</Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/YYYY"
            value={periodDates}
            onChangeText={setPeriodDates}
            placeholderTextColor="#666"
          />

          <View style={styles.checkboxContainer}>
            <Checkbox
              status={regularity ? 'checked' : 'unchecked'}
              onPress={() => setPeriodRegularity(!regularity)}
              color="#0066FF"
            />
            <Text style={styles.checkboxLabel}>Regular Periods</Text>
          </View>
        </View>

        <View style={styles.verificationSection}>
          <View style={styles.checkboxContainer}>
            <Checkbox
              status={reportVerified ? 'checked' : 'unchecked'}
              onPress={() => setReportVerified(!reportVerified)}
              color="#0066FF"
            />
            <Text style={styles.checkboxLabel}>
              I verify that the uploaded report is authentic
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Complete Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  decorativeImage: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 300,
    height: 300,
    transform: [{ rotate: '180deg' }],
    opacity: 0.7,
  },
  headerContainer: {
    padding: 24,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0066F0',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#000',
    lineHeight: 24,
    maxWidth: '80%',
  },
  formContainer: {
    padding: 24,
  },
  formSection: {
    marginBottom: 32,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#f5f8ff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
    fontSize: 12,
    borderWidth: 1,
    borderColor: '#e0e7ff',
  },
  pickerInput: {
    backgroundColor: '#f5f8ff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
    fontSize: 12,
    borderWidth: 1,
    borderColor: '#e0e7ff',
    color: '#333',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  uploadButton: {
    backgroundColor: '#f5f8ff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#0066FF',
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#0066FF',
    fontSize: 16,
    fontWeight: '500',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#444',
    marginLeft: 0,
  },
  verificationSection: {
    marginBottom: 24,
  },
  submitButton: {
    backgroundColor: '#0066FF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HealthForm;