import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, Modal, StyleSheet, ActivityIndicator } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { databases } from '@/services/context/AuthContext';
import { AuthContext } from '@/services/context/AuthContext';

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext); // Get authenticated user info and loading state
  const [userData, setUserData] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (loading) return; // Wait until loading is complete
    if (!user?.id) {
      console.log('User ID is not available');
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await databases.getDocument(
          '67322db0002747477ca7', // Database ID
          '67322dc600131bf5b628', // Collection ID
          user.id // User ID dynamically provided to fetch the document
        );
        console.log('Fetched User Data:', response);
        setUserData(response);
        setShowPopup(true);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [user?.id, loading]); // Run only when user ID or loading state changes

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to the Dashboard</Text>
      <Modal
        visible={showPopup}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPopup(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.popup}>
            <Text style={styles.title}>User Information</Text>
            {userData ? (
              <>
                <Text>Age: {userData.age}</Text>
                <Text>Profession: {userData.profession}</Text>
                <Text>Job Hours: {userData.jobHours}</Text>
                <Text>Checkup Frequency: {userData.checkupFrequency}</Text>
                <Text>Clinical Issues: {userData.clinicalIssues}</Text>
                <Text>Period Dates: {new Date(userData.periodDates).toLocaleDateString()}</Text>
                <Text>Regularity: {userData.regularity ? 'Yes' : 'No'}</Text>
                <Text>Report Verified: {userData.reportVerified ? 'Yes' : 'No'}</Text>

                <View style={styles.checkboxContainer}>
                  <Checkbox
                    status={isChecked ? 'checked' : 'unchecked'}
                    onPress={() => setIsChecked(!isChecked)}
                  />
                  <Text>Accept Terms and Conditions</Text>
                </View>
              </>
            ) : (
              <Text>Loading...</Text>
            )}
            <Button title="Close" onPress={() => setShowPopup(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  popup: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
});
