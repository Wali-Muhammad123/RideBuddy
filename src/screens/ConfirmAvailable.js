import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Dialog, Portal, PaperProvider, Text } from 'react-native-paper';


const ConfirmAvailable = ({navigation}) => {
    const [visible, setVisible] = React.useState(true);
    
    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);
    return (
        <PaperProvider>
            <View>
                <Portal>
                    <Dialog visible={showDialog}>
                        <Dialog.Title>Alert</Dialog.Title>
                        <Dialog.Content>
                            <Text variant="bodyMedium">This is simple dialog</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={hideDialog}>Done</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        </PaperProvider>
    );
};

export default ConfirmAvailable;