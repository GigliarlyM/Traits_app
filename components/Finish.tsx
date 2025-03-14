import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import IconMaterial from 'react-native-vector-icons/MaterialIcons'
import IconAnt from 'react-native-vector-icons/AntDesign'

const FinishView: React.FC<{ onExit: () => void }> = ({ onExit }) => {
    return (
        <ScrollView style={{ backgroundColor: '#1a4a90' }}>
            <TouchableOpacity onPress={onExit}>
                <IconAnt
                    name="closecircle"
                    size={45} color={'white'}
                    style={{ position: 'absolute', top: 10, right: 20 }} />
            </TouchableOpacity>

            <View style={{marginTop: 200}}>
                <IconMaterial
                    name="done-outline"
                    size={120} color={"green"}
                    style={{ textAlign: "center" }} />

                <Text style={{ color: 'white', textAlign: "center" }}>Compra finalizada com sucesso! 🫡😊</Text>
            </View>
        </ScrollView>
    )
}

export default FinishView