import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  FlatList,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import Banner from '../../components/Banner';
import Video from 'react-native-video';
import {COLORS} from '../../utils';
import Slider from '../../components/Slider';

let {height, width} = Dimensions.get('window');

const WelcomeScreen = () => {
  const player = useRef(null);

  const img = [
    {
      id: 1,
      img: 'https://lh3.googleusercontent.com/fife/AMPSemebot8vfjRJR6d4b5_pnngMxeSGY3sBpPlta3rJD3m4i_HZlpLftgChWeBPOqIuA6uW8O67IhU2nmXNdL-XjT-lD2TI5B7x1T42Yv92iR8y8e71EP8l4w1x1KaTwRFRAWDzHWUcKwY4Hoj-pvWrC2zMjY5MmjamY2hIi5Zrz9d8v4YeMbP5wEqMOEFnfdh05-i73OT5dCzjdHpUqS84Ou8Zl70LHYgqQLqQWlY-KsnpWuNMzLi68oW4YAaol6Mr8rGP1_UtaNLVqujOwoNaXPw-eLi6a3qRAj3oFCGR1DxMxrrTA_ZOlFXdWN8Rqv303ps-DhGOjWhhK0NO5B0yapjJgo81ZE2J640yFdyI_CqWD2KYTvA60O9WsmTzcOFoSPPmpHPKKZQYazbERYHSgIWepPvEI5yVM68uXda20Q9x9uCaqO45ukZLoRMpbpmfWgQxjgMUvVB10cJbdLvBBGWFXBpGHmxhG0-Dt55CzXvLtExhxPJKZhkHEaBLgyX-q1ccrFNfLFEAV86fYJ6eO88YupXZJzgndhkkIPcVfeEVX2pZwB9caWCz5vOhOjjXUJI-UnghMkFVrSwL9EKIUOwwSwlzxp8vNBBzWNffpAGz__J5RCmIA00fBonuzB7GTHAfiC-hMH6fUs3FTouoQiXHlojDpU6F2g7NU9P0NoT6sz1x4DsKh3OTVtKmGgbe3dV-NKB9mHVTd9LQRnKLIFYeAZLLCjIMg1-rddeY-gtVTJHyKLf4QyPwUiZcHo6EZPDwWZBndc5eWzmGj71lybGL1FotyRR1UpwIy3KInIhJ8X15rAW_0SqGk9ITUTVrn_iES6KrGr7asHfGUpUPxE4rL0HnEA3-xoVnU2BCqwie59p6G1cQ38lsi9AcsIlUGt_WJrW6B2WYXdqMXjysUeoDojntm2f-IqJPwkOdkcdwZ9G7SiH8-EAW82p31B9l87Z_gaFRFPECvPASieSvNXyYuzzVs8ZAvr0Xb4Bo277p0T20FEF_3NH2Bj-wllyEQ1x-cpUXOLZBg-GG5PsK9BQ_DasmUm8f8DNdPxMGfkhjuKNvFVC22PLnJEZBeNP-Zv8tKCYK69JbnGAdJRpxIJT9kcGGSvQxRWRQgcpoBuqhefIztA_tZ-x3v9oeHM_kmSKK9tqggahR-Htn2UYbWhbvkwL9AktJ6Uf5C1PeNkfABsWtxyNrbW2cniiqYjCJ78X3KJJd5hb4f5S9q7_WB52kyEEn4wjvYK_ePa7VHrKLIus3LjHpcD21U4ZM6EKngyNimZRMc9hyBE_w3PV339_-PD6ydfUTmPTpqCK5UDBD0u0Wpz7TLF7aDCS64--R98VnWD3YzDMG6Q0TmWlivN53YqucLyPwJV8bo1-X2gkRbMyyWruVvbF5RZd3paU6KRdYH8dlNNwz9Dhw53UiEJNR0vQNZT9zbUHAHO_GGiACtsDXFRw1pKG-WsxdPoV3_isVODGsNFXUNCRCvg66qvBb9wH3plPqNrIX-Wf2VXQqb-r8L-BJSkzkz-NbiJakie76pT6KslSC_GbX4sT3JUi95ohMmL9KaPVvtB6JICk_gfJoiC1-crEL2o16Fl7aYypyxYOyyy6AOQvbZSWYgOA4ioakbtid8Ka9fzFnuUwfk-LbEmdTgtktVdWPseyaH-FqVJL-GDiZuYccwu8o0JO8j9YW8DSFjB_b69bYfF1i_9WbvrSp=w2358-h1592',
    },
    {
      id: 2,
      img: 'https://lh3.googleusercontent.com/fife/AMPSemeUtLlcgHVNahAOf6lBMYxU4XOrkSDC-5C4lOuR5Knx8_6B6y7KOQfnnL9ZYQ25w87tgsb4N_d-RH29ZScngLrvsrzGHj-PHIjYZ24JqM_Gg0Wo20-Z_SVzIWIidMo0XM75GADfUhaVfnEJ_KpaaAuWJPiitD9iEAMseAR43DO8UQofCaD8ZUdajFozHZVVFahtTQG5uL_Mz-lAE3K81hdpQl5Q26M1KOtv6nUVoyO-zC11e3WgTAPjVgwp9BLv0MSz6HUs8wM212WosBBVXNEx4VmX-n7qEMSQhQrCNr9AaIYLMhslhLFZqrdwGJH7511StGqQNPluuC9XXOsAElJygNo10bnXzUlIkiZWoF-1mfAN0u1rSHq6smU5T0F9moDWCNpDGkpA2evDrE5Y85YNjnciyoB6_HowF62Cxg4Xfc6FcPJYOnXAVNZO6pQiJGauGexjS7WiWZ2PnpX8McCzq7xUB3Q-s8EWYhUz_A8GcUkDne1m7N8SFtgFKy9wtmqL6aeDc_8rfK-v5Ud6xFLOg_I0O9x-kcd0yP8p9jxexovpQ-fUV90po7Hv8zYtBDOzkWRdiVgHG_Bcd9xfMVSSxtO8VeKb6HO6la2Ivq0_uxVcK2UKKjcovn4E8g_KLr7G8sXvUB1B4g9zHCIViyWT3PWf2IDxOVLLYF3rsmJF3pS-Y2pHnfW2sy3Lx-ubzCwwetKcMCc6ezNfOGZ2tIgMSPoERE_pZ8hvHBsVibj45HOMwL3QE2czh9dt5yk_Dky1-rAifmVqJH9JCkwZD-bBLQkW-R5shIXaKKFYAxBrRApfCtSiZrfLGSCm5jZwsbcu8OWRbWmHszJnJke3FTH6aRC7dXSnho_93gjMZsPSuT4wQEzi6LrgA_7jrpsUU9OynpEEs__i3FkqEubDsjE-CKPwuBTvvrDEF4M0ztfIERrnH0YXwdTwz9xdlXVaeRucXEQS7lME9osBx9Q6emI-CwY5y6QgRHP9XmBgUJQrV455uMTSbVfpN6u9B4ld-Q5KF8J1GaVLziSPyymDsjiPdIPPjIkytx-Jw6IPLveCzR6kssvSnh4eCY4qo49sf1rRT1cebu92QrLpyhdpkdL-Hzct6xfmS48cn5c6KTDNRVNQcCAYOrT0XpsqazErtlS49_oESzZFcIjAKHqTMHyYmgddS2KV2gN5oLjKGN0npK6ia8qjTzfUKidgF2iIJc-OIfO2VqdFBoloAmpRH7a2SOLMoBXA6MMGQEmRgB-zJBbiHuEuoMn9Xn3OGF_Pwa35Dz6Gce5HGNY-1HCy9dlEx32-Ssmu7q2Foev2kNJfZYTUw5WnI6cjnAszsxM3XM1ByzZxX04eYzHPnKBuDMB0YvVcNkaEpr9EkxDH0To98n5Ja33135dLOevJMo2WIWzHWzBxeFThWG1D57lRgYH65act3WU1v25FeKkIQAAhexD26Kw03QjNTfKarAXavdrAE5QoYH8Sddp0QXwZjTyg2Zhpe-iba3-AuNvIL-UA-0a4wfwv7K2VKKySLkCq5uWJsuIxwIDTKZadexn8_qz01pQ8bM86STheM2hI-lp-phKWFgnfrvjrhHOr5cySS16hDXxw7TkDumVqZQm6niN053XIbGTJttNGcOS1lcmuqE7NVtJQTbNFMTsKE-oE8FIh0AebcXX1SASDSflcGh96KYPKvPpiMpe9i8L1ASGgApOmIWJ4=w2358-h1592',
    },
    {
      id: 3,
      img: 'https://lh3.googleusercontent.com/fife/AMPSemeCaBx8amSZpwA1jnLd5KIKO7nxoCGUEIPSJnAHfdJJERMfFYw0ViCfJE8CToeO5RD1MEeMPijXJq1vaU3Y3QMxCEBh0rZkrfhsj_2BigrNzDK647nIofsAMQJS_wvys1PKgDQaD5LNue1x45CuBvTg7b0TyIwoejAq38WTKTL-a50DYar5TbY8ZYZ-FcrtVXwkMsqANAnLQ2D0k7pUW31SpBP070tms3UtAfVSF0dH3tWJOvK3C_-JEYPf9u1UbVYp1H-KA-C3b3mjN8d_pKelnIxoZaXTDNOCpCTNHiedhXLe89Q-JIhkXc8ylzNstUg3NcAcLFwwfC_jKpWzGn2EJL1MfMFHIij4zYabLApSyhka-u2oBnCr3HZndTT7T4QTQfAFtp2MGwnVIbziNn9Ma_00w3GBMe-L1OlMoVFIR6oW9YVTFmxxw8iZDIwzf9YkhylaYH8vUxiU_gGY_Y72BMwLnE5GgPR1kxAwzkhCE6Wk7fAtTM-QiFfNRP6BVbvZuwNjsGlHeCeCuu-k1-EXyhmAXif9NrNQCWonT3XVSmdmdaa-Ol1kSGn4uIdCzABk0zZ-t1pyuiaoQlXWwX78K728Re2V0asbuUN6YtYl7VWtnD3s5ub-0yxfgY_ay3kRYbRamURqYHz2Pk1n6GfkDJFTph3b7ILLCKOhwsZjVVsozW3NhuyzNODoeexx6YNmj4IExHSPRlUfcmdLGg_bzIxyY4UjmBrKp7bjkoyXLteDY5LCJUSP-N8ZZaJo0wXrs17ZnOrbFqI_ANJReqG1Fm67Xro89qUQa90pBoD8Q-T04QRyyJtCKt8f0uothrKLyk3GyG7Bo8MzYVOittWrYSkNNgj3mFOdDmnDDqzvFB7QTofryr92f_4hoQQuFhRK5TZS3L9Opn7bL_daS9Y6ZAYudQOLrOtyEzp7pa1Eo4wJ05kuBHkj_o2wAEreBmLZmpGB3xyNf_9VjtlrHt8usyzxBKkOZwT11rKFvtfNUVaohI2hwybs0MMuTv1bcz994g0hHfXIXvLjrSrRxuWw5gZQ-iLchtt5jSEWpvXIGUCDl7tBkRhAwA-LI2coUvzdCDmZP2Zx88m03kQt-s80Z1nK-mTOQ6-MD9oI-6kuYHJZ6_f6uQI5zUDGO9FEta7z9M91um7RbCh7egKco9JwnfmJ_oX7SCiT_tN9BIkWn5kq4158dyIIYixuh-U8MQSjS2DpaF5IJ5SUct64eFSJXZfA_seKpPuhIdFj9JQ708UF220FD78t_4qzcKoEzG-dqgmo_LNbEnV6qyxPynQc1AUfmUGEnvoN-bqFd8cM4kMN7fqETvF3e2yExu3Zrp0W3zHazcolQC3TknHvPoywm0W2Tuwbq9atMQgHdcWkgybYsG8BtspG3Kb5gf99iwjnhOSMvTEakm3OensViqqP40aOZL7mb9Rp9IAddOC0g776s8xS4sh64icok1_0cvhyBfEh1T6Aqk6ysTv9y1BqLE9uOxA8789sXzrW5V7Wsjpl5-1sZ9GeSMP4hPURZeG7vGRfCapvAF3hDteV7VBLXx-G9WWjXbgGoM9V4JfwvUgzt34HeTDMutLm_LK5VnKyJXtM6gmnZFBCQvZbJH34UXIErkNKb73P74Y8DOb-ioMeOHtwOLbaQxdTbD14rNBSo2xt_kcLKlWcGKZ5EhTOTeM8UE4eaZZXqum0CVJR5R5-kUYs=w2358-h1592',
    },
    {
      id: 4,
      img: 'https://lh3.googleusercontent.com/fife/AMPSemeDZIgeK3Zv6VBYGROczzBDsV4qAh-_KP4f5ZQr9iRTh6ejMwHodBZ1wtRUZJzp-ki0EC81RSzl2Qj7MYjW-4oaSq2slGCq6YIvzSSgKbFH0Ht2xIC8k3y2JUfuN3SWAnY2VRQilGSdnMJ6PEuEPp7sYQqzJdYQqa_wXgbpcxfG6PkZIFzWEaOGcrnpdg-h1uPUJluRIxVwu_WeOODVo4Q6DTlpK3-qS4oup71XdKHLycQhhMZP8wq6O5wrU_LoOzBlfN5AV1mbJfh8xmvLE9RMVVFtlIe6x1qjlYmtupzGKr2S_zN6DaWcB26ygQqkBZEpwAAy313Et0Npck_-r-GmG48TEUZAczNYmihb46KKg7oF_IvKewez_UFNUDEua-HkYy_PNVorsq_EvtHVtqXQZMlCGHMylaJByIBv0B3PqAuRIEE9E3J09KrdNRnNS4Kg0K741zMgdIysjCqpamNAxOudXQVFLpq-cMTykcy8WLvYmHKQRyjsj9e3YK06eFgxb6jICBs1Fpjj3flPMronEZdBvUm35joreCYvo36v_PK6KFpc-ulycGHwa0S4fLyXFBC7_OV8UA-VfH9cp8mOjPSSvYVfgH-owftZ2kAeBgZqgPdwhmd5o2ksN588k5iuByMMoZ1h1bQ7h_WIAFrWLWr9CB0xFBwB9HKUB3q6WoM9T_kZEE8LkEtX5zxpfVCHa1u9KXGJTK0unZrVe8SD9VL_BbYRHv_h2HXq2k46ENLXX0m2RUowUnuGD6FNemd9f061j8eZORdKBPlHAE-Z_-Z6ncZTfTCn55zEa7SAAYg6cAUv_NKMBzOWXhh6zulEQ74OI7u-WlCiHnVhP-uskzQtGQtNjToBHBcyRafHq2mHwfre3XfgL7Zewg8nBcUWl43FADaECT5SqN9pyyFKlSE5lECFqMvuAa08jqYmRGNcsi4isy1i7aXw0BEIc8uZuY19-s7GptcVRbr7_RHPWoBu0NtcvFwehs_xxe-8TKozwZo9AYaD4k8erYW38xI7oVimhoa2ZQ4OXl1HiXwG1gvmtrEgThVCjHWB-VrVFuje4WABIxkyWqcyBkbA0yAae1wbHK71xum86CHhP9PQaXaYl_HeTn23cnkx-yO0y9Zehi9b4yDnORJH34bta39w184fwQFRtw5B-O0LorXs2Pqr07_f9ibBW16y0i6htV_cWO-MaJnCkqOQlop5VSZ_l8dcYZGDUIrkXJUVw5RkBi-kjYOVB4KhDB95iq6wB3vESu8XxEI8Iyy5katAUJ1b3aoMiI8fTlbaeGQCFLo8zi-KpVMX_agiCoWROaClQuqIMMbpSq3GbveTCfkFXCdS3yGL-Tbh0nD_MKdu8Mxk3Pt0nYZwpgFHyBKHQth-skQ3_Rx6QvXlgWAbbg7Sjj_t5XBnrxZeYU3auDTeazkpohCqzXtY6dzzXPqLVuzQdYEjjyC91bstiJm6H0qdH5AUcBPoOtJ_WEWF2EBLQJyOuB_MbdkJqyCWwMjOY2QkGs_zujvEEUU8RnuzzouWEcEXVvqJwz0ZNvuCbEpltgKt1LBodbD0qd-fggmVX6B0CVEkjRdw0lxIE1BBbfECT5rBd1e_n4qRmBI5c4P93-RSzgZagEYdnmjnadJw2ZN5xXKPlZDylEhHyTXDenYeEtdcFaxcswXHQ8hlv5pTXDzE5wmg_2mq0LKM9ETfwKemDE41P0zO=w2358-h1592',
    },
  ];
  const slider = [
    {
      id: '1',
      chips: 'Volunteer 1',
      title: 'Volunteer Name',
      subtitle: 'Short Intro 1',
      // image: require('../../assets/b1.png'),
      backgroundColor: '#edb96e',
    },
    {
      id: '2',
      chips: 'Volunteer 2',
      title: 'Volunteer Name',
      subtitle: 'Short Info 2',
      // image: require('../../assets/b2.png'),
      backgroundColor: '#16a085',
    },
  ];
  return (
    <SafeAreaView
      style={{backgroundColor: 'white', flex: 1, paddingHorizontal: 10,}}>
      <ScrollView style={{ marginBottom:20}}>
        <View>
          <Banner banners={img} />
        </View>
        <View
          style={{
            backgroundColor: COLORS.white,
            marginTop: '1%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <View
          // source={require('../../assets/logo.jpeg')}
          // resizeMode="contain"
            style={{
              borderWidth: 1,
              borderColor: COLORS.lightGray1,
              borderStyle: 'solid',
              width: width / 2 - 20,
              // height: '94%',
              borderRadius: 20,
              marginTop: '5%',
              alignItems:'center',
              padding:5,
              justifyContent:'center'
            }}>
            <Image
              source={require('../../assets/logo.jpeg')}
              style={{width: width / 2 - 40,height:width / 2 - 40}}
              resizeMode="contailzn"
            />
          </View>
          <View style={{width: width / 2 - 20}}>
            <Text
              style={{fontSize: 40, textAlign: 'center', color: COLORS.text}}>
              About Us
            </Text>
            <Text
              isSecondary
              isCenter
              style={{marginTop: '2%', marginBottom: '7%'}}>
             Robert
            </Text>
            <Video
              source={require('../../assets/vid.mp4')} // Can be a URL or a local file.
              ref={player} // Callback when video cannot be loaded
              style={{
                width: width / 2 - 20,
                height: width / 2 - 20,
                borderRadius: 10,
              }}
              playInBackground={true}
              repeat={true}
              muted={true}
              resizeMode="contain"
              controls
            />
          </View>
        </View>

        <View style={{marginTop: 20}}>
          <FlatList
            data={slider}
            // scrollEnabled={false}
            renderItem={({item}) => <Slider item={item} />}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default WelcomeScreen;
