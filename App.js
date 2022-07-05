import * as React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    Button,
    Alert,
    ActivityIndicator,
    Platform,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FirebaseRecaptcha from 'expo-firebase-recaptcha';
import { firebaseConfig } from './firebase_cofig';
import firebase from 'firebase/compat';

export default function PhoneAuthScreen() {
    const recaptchaVerifier = React.useRef(null);
    const verificationCodeTextInput = React.useRef(null);

    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [verificationId, setVerificationId] = React.useState('');
    const [verificationCode, setVerificationCode] = React.useState('');

    const sendVerification = () => {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        phoneProvider
            .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
            .then(setVerificationId);
        setPhoneNumber('');
    };
    const confirmCode = () => {
        const credential = firebase.auth.PhoneAuthProvider.credential(
            verificationId,
            verificationCode
        );
        firebase
            .auth()
            .signInWithCredential(credential)
            .then(() => {
                setVerificationCode('');
                Alert.alert('Login successful');
            })
            .catch((error) => {
                Alert.alert('Login fail');
                // console.log(error);
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <FirebaseRecaptcha.FirebaseRecaptchaVerifierModal
                    ref={recaptchaVerifier}
                    firebaseConfig={firebaseConfig}
                />
                <Text style={styles.title}>Firebase Phone Auth</Text>
                <Text style={styles.text}>Enter phone number</Text>
                <TextInput
                    style={styles.textInput}
                    autoCompleteType="tel"
                    keyboardType="phone-pad"
                    textContentType="telephoneNumber"
                    placeholder="+1 999 999 9999"
                    // editable={!verificationId}
                    onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                />
                <Button
                    title={`${verificationId ? 'Resend' : 'Send'} Verification Code`}
                    disabled={!phoneNumber}
                    onPress={sendVerification}
                />

                <Text style={styles.text}>Enter verification code</Text>
                <TextInput
                    ref={verificationCodeTextInput}
                    style={styles.textInput}
                    editable={!!verificationId}
                    placeholder="123456"
                    onChangeText={(verificationCode) =>
                        setVerificationCode(verificationCode)
                    }
                />
                <Button
                    title="Confirm Verification Code"
                    disabled={!verificationCode}
                    onPress={confirmCode}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    content: {
        marginTop: 50,
    },
    title: {
        marginBottom: 2,
        fontSize: 29,
        fontWeight: 'bold',
    },
    subtitle: {
        marginBottom: 10,
        opacity: 0.35,
        fontWeight: 'bold',
    },
    text: {
        marginTop: 30,
        marginBottom: 4,
    },
    textInput: {
        marginBottom: 8,
        fontSize: 17,
        fontWeight: 'bold',
    },
    error: {
        marginTop: 10,
        fontWeight: 'bold',
        color: 'red',
    },
    success: {
        marginTop: 10,
        fontWeight: 'bold',
        color: 'blue',
    },
    loader: {
        marginTop: 10,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#FFFFFFC0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlayText: {
        fontWeight: 'bold',
    },
});
