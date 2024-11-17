import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { databases } from '@/services/context/AuthContext';
import { AuthContext } from '@/services/context/AuthContext';

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const [userData, setUserData] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user?.id) {
      console.log('User ID is not available');
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await databases.getDocument(
          '67322db0002747477ca7',
          '67322dc600131bf5b628',
          user.id
        );
        console.log('Fetched User Data:', response);
        setUserData(response);
        setShowPopup(true);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [user?.id, loading]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0066FF" />
        <Text style={styles.loadingText}>Loading your health profile...</Text>
      </View>
    );
  }

  const InfoCard = ({ title, value }: { title: string; value: string | number | boolean }) => (
    <View style={styles.infoCard}>
      <Text style={styles.infoTitle}>{title}</Text>
      <Text style={styles.infoValue}>
        {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.welcomeText}>Welcome Back</Text>
        <Text style={styles.nameText}>{user?.name || 'User'}</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>7</Text>
            <Text style={styles.statLabel}>Days Tracked</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>85%</Text>
            <Text style={styles.statLabel}>Health Score</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Reports</Text>
          </View>
        </View>
      </View>

      <Modal
        visible={showPopup}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPopup(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Health Profile</Text>
            <ScrollView style={styles.modalScroll}>
              {userData && (
                <View style={styles.infoGrid}>
                  <InfoCard title="Age" value={userData.age} />
                  <InfoCard title="Profession" value={userData.profession} />
                  <InfoCard title="Daily Hours" value={`${userData.jobHours}h`} />
                  <InfoCard title="Checkups" value={userData.checkupFrequency} />
                  <InfoCard title="Health Issues" value={userData.clinicalIssues || 'None reported'} />
                  <InfoCard title="Last Period" value={new Date(userData.periodDates).toLocaleDateString()} />
                  <InfoCard title="Regular Cycle" value={userData.regularity} />
                  <InfoCard title="Verified Report" value={userData.reportVerified} />
                </View>
              )}

              <View style={styles.termsContainer}>
                <Checkbox
                  status={isChecked ? 'checked' : 'unchecked'}
                  onPress={() => setIsChecked(!isChecked)}
                  color="#0066FF"
                />
                <Text style={styles.termsText}>
                  I understand and agree to the terms of service
                </Text>
              </View>
            </ScrollView>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowPopup(false)}
            >
              <Text style={styles.closeButtonText}>Close Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  headerSection: {
    padding: 24,
    backgroundColor: '#0066FF',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  welcomeText: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  nameText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  statBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    maxHeight: '90%',
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  modalScroll: {
    maxHeight: '80%',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  infoCard: {
    width: '48%',
    backgroundColor: '#f5f8ff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
    paddingHorizontal: 8,
  },
  termsText: {
    flex: 1,
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
  },
  closeButton: {
    backgroundColor: '#0066FF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Dashboard;