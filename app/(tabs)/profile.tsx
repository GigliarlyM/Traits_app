import { ArtView, ComponetArtProp } from "@/components/ArtView";
import { useAuth } from "@/components/UserContext";
import httpService from "@/service/httpService";
import { useEffect, useState } from "react";
import { FlatList, InteractionManager, ScrollView, StyleSheet, Text, View } from "react-native";

interface ArtistProps {
  _id: string;
  userName: string;
  artes: string[];
  client: string
}

interface ArtProps {
  _id: string;
  titulo: string;
  imagem?: string;
  genero?: boolean;
  valor: number;
  descricao?: string;
}

interface PaymentProps {
  _id: string;
  status: boolean;
  formaPagamento: string;
  quaisItens: string[];
  cliente: string;
}

export default function TabProfileScreen() {
  const { name, email, auth } = useAuth()
  const [artist, setArtist] = useState<ArtistProps | null>(null)
  const [arts, setArts] = useState<ArtProps[] | null>(null)
  const [payments, setPayments] = useState<PaymentProps[] | null>(null)
  const [artsTitles, setArtsTitles] = useState('')

  const getInfoArtist = async () => {
    if (name) {
      const result = await httpService.getWithAuth(`/artist/client/${name}`, (auth as string))
      if (result) {
        const artistResult = (result.artist as ArtistProps)
        setArtist(artistResult)
        console.log("ARTISTA ", artist)
      }
    }
  }
  const getInfoPayments = async () => {
    if (name) {
      const paymentsResult = await httpService.getWithAuth(`/payment/client/${name}`, (auth as string))
      const paymentsList = paymentsResult.payments as PaymentProps[]
      console.log("PAGAMENTOS ", paymentsList)
      setPayments(paymentsList)
    }
  }
  const getInfoArts = async () => {
    if (artist) {
      const artsResult = await httpService.getWithAuth(`/art/artist/${artist.userName}`, (auth as string))
      const listArts = artsResult.artes as ArtProps[]
      setArts(listArts)
      console.log("ARTES ", arts)
    }
  }

  const extratArts = (itens: string[]) => {
    itens.forEach(async (artId) => {
      const arts = await httpService.getWithAuth(`/art/${artId}`, (auth as string))
      setArtsTitles(`${artsTitles}, ${arts.titulo}`)
    })
  }


  useEffect(() => {
    if (auth != null) {
      getInfoArtist().then(() => getInfoArts())

      getInfoPayments().then(() => {
        payments?.forEach(payment => {
          extratArts(payment.quaisItens)
        })
      })
    }
  }, [])

  return (
    <View style={{ marginHorizontal: 10 }}>
      <Text style={[style.text, style.sectionText]}>SUA CONTA</Text>
      <Text style={style.text}>Nome: {name ? name : "TU ta sem nome bixo"}</Text>
      <Text style={style.text}>Email: {email ? email : "Tu ja fez o login?"}</Text>

      <ScrollView horizontal>
        {artist &&
          <View style={style.section}>
            <Text style={[style.text, style.sectionText]}>Secao para conta de artista</Text>
            <Text style={style.text}>Nome de artista: {artist?.userName}</Text>
            <Text style={style.text}>Aqui fica as artes que ele fez:</Text>
            {arts &&
              <FlatList
                data={arts}
                renderItem={({ item }) => (
                  <ArtView
                    key={item._id}
                    title={item.titulo}
                    image={item.imagem}
                    saled={false}
                    valueArt={item.valor}
                  />)
                }
              />
            }
          </View>
        }

        {payments && <View style={style.section}>
          <Text style={[style.text, style.sectionText]}>Pagamentos</Text>
          {payments &&
            <FlatList
              data={payments}
              renderItem={({ item }) => (
                <View style={{ marginVertical: 10 }}>
                  <Text style={style.text}>ID: {item._id}</Text>
                  <Text style={style.text}>Status: {item.status ? 'Pago' : 'Pendente'}</Text>
                  <Text style={style.text}>Forma de pagamento: {item.formaPagamento}</Text>
                  <Text style={style.text}>Itens: {artsTitles}</Text>
                </View>
              )}
            />
          }
        </View>}
      </ScrollView>
    </View>
  )
}

const style = StyleSheet.create({
  section: {
    marginVertical: 10,
    marginBottom: 20,
    backgroundColor: '#1a4a90',
    paddingHorizontal: 10,
    paddingVertical: 10,
    maxWidth: 400
  },
  sectionText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 20,
    color: '#fff',
  }
})