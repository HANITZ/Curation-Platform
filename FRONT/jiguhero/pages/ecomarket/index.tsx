import styled from "styled-components";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Modal from "components/modal";
// import { Token, BASE_URL } from "pages/api/fetch";
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import SourceRoundedIcon from '@mui/icons-material/SourceRounded';
import getSido from 'pages/api/ecomarket/getSido';
import getGugun from 'pages/api/ecomarket/getGugun';
import getDong from 'pages/api/ecomarket/getDong';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PersonPinRoundedIcon from '@mui/icons-material/PersonPinRounded';
import getReview from "pages/api/place/getReview";
import { dehydrate, Query, QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { getSession} from "next-auth/react";
import { InfoBtn } from "pages/ground/[id]";
import Head from 'next/head';
import getMyGps from 'pages/api/ecomarket/getMyGps';
import getImgList from 'pages/api/place/getImgList';

const Div = styled("div")`
  position: relative;
`;

export const LocIcon = styled(LocationOnRoundedIcon)`
  font-size:1em;
  color:#98C064;
`
export const ConIcon = styled(SourceRoundedIcon)`
  font-size:1em;
  color:#98C064;
`
export const WithIcon = styled('div')`
  display:flex;
  align-items: baseline;
`
export const Content = styled("div")`
  z-index: 995;
  position: absolute;
  top: 20px;
  left: 15px;
  display:flex;
  @media only screen and (max-width: 650px) {
    flex-direction: column;
    left:15px;
    right:15px;
    padding:0 auto;
  }
`;
// const Title = styled("div")`
//   display: flex;
//   background-color: white;
//   box-shadow: 0 0 10px #999999;
//   padding: 10px 10px;
//   border: 0;
//   border-radius: 20px;
//   p {
//     font-size: 1rem;
//     margin-left: 10px;
//     font-weight: bold;
//   }
//   :hover {
//     background-color: #d1e5f5;
//   }
// `;
export const PlaceGroup = styled("div")`
  position: absolute;
  z-index: 996;
  width: inherit;
  height: 80%;
  overflow: auto;
  padding: 10px;
  @media only screen and (max-width: 650px) {
    height: 50vh;
    top: 30vh;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: start;
  }
  @media only screen and (min-width: 650px) {
    top: 100px;
    right: 20px;
  }
  ::-webkit-scrollbar {
    width: 0;
  }
`;
export const Place = styled("div")`
  position:relative;
  background-color: white;
  box-shadow: 0 0 10px #999999;
  padding: 15px 25px;
  border: 0;
  border-radius: 20px;
  width: 350px;
  margin-bottom: 15px;
  p {
    margin: 5px;
  }
  :hover {
    background-color: #65ace2;
    .placeTitle {
      color: #252525;
    }
    .icon{
      color:white;
    }
    .detailBtn{
      color:white;
    }
  }
`;
const SearchIcon = styled(SearchRoundedIcon)`
  color:#65ace2;
  height:35px;
  width:35px;
  margin-left:10px;
  @media only screen and (max-width: 650px) {
    width:30px;
    height:30px;
  }
`
const UserGps = styled(PersonPinRoundedIcon)`
  color: #98c064;
  margin-left:10px;
  height:35px;
  width:35px;
  @media only screen and (max-width: 650px) {
    width:30px;
    height:30px;
  }
`
const SearchBox = styled('div')`
  display:flex;
  height:65px;
  background-color: white;
  margin-left:10px;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  border-radius: 15px;
  box-shadow: 0 0 10px #999999;
  @media only screen and (max-width: 650px) {
    margin:0;
  }
  @media only screen and (max-width: 400px) {
    width:100%;
  }
`
export const PlaceTitle = styled("p")`
  font-size: 18px;
  font-weight: bold;
  color: #65ace2;
`;
export const PlaceAddress = styled("p")`
  font-size: 15px;
`;
export const PlaceContent = styled("p")`
  font-size: 15px;
  display:block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const Back = styled(ArrowBackIosRoundedIcon)`
  color: #98c064;
`;

const Mapping = styled("div")`
  z-index: 1;
  width: 100vw;
  height: calc(100vh - 80px);
  @media only screen and (max-width: 650px) {
    height: calc(100vh - 160px);
  }
  `
const SelectBox = styled('select')`
  height:40px;
  margin-left:10px;
  border:1px solid #888888;
  border-radius: 10px;
  padding:10px;
  display: inline-block;
  font-size:15px;
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
    overflow-y: scroll;
  -moz-appearance:none;  /* Firefox */
  -webkit-appearance:none;  /* Safari and Chrome */
  appearance:none;  /* ????????? ????????? ??????*/
  ::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
}
  
  /* box-shadow: 0 0 10px #999999; */
  @media only screen and (max-width: 650px) {
    font-size:12px;
  }
  @media only screen and (max-width: 400px) {
    width:85%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export default function FullMap(props:any) {

  const router = useRouter();
  const [show, setShow] = useState(false);
  const [choiceP, setChoiceP] = useState([]);
  const [data, setData] = useState([]);
  const { data: sido } = useQuery(['sido'], getSido);
  const [ChoiceSido, setChoiceSido] = useState(['00', '']);
  const { data: gugun } = useQuery(['gugun', ChoiceSido], () => getGugun(ChoiceSido[0]), {
    enabled: !!ChoiceSido,
  });
  const [ChoiceGugun, setChoiceGugun] = useState(['00', '']);
  const { data: dong } = useQuery(['dong', ChoiceGugun], () => getDong(ChoiceGugun[0]), {
    enabled: !!ChoiceGugun
  })
  const [ChoiceDong, setChoiceDong] = useState(['00', '']);
  const [reviews, setReviews] = useState([]);
  const [imgList, setImgList] = useState([]);

  useEffect(()=>{
    window.kakao.maps.load(function(){moveMyGps()})
  }, [])
  useEffect(() => {
    console.log(choiceP)
    getReview(choiceP['placeId']).then((res) => {
      setReviews(res)
    })
    getImgList(choiceP['placeId']).then((res) => {
      setImgList(res.imageURL)
    })
  }, [choiceP])

  function getFetch(lat, lon, map) {
    var imageSrc =
      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
    getMyGps(lat, lon)
      .then((res) => {
        console.log(res)
        setData(res)
        for (var i = 0; i < res?.length; i++) {
          // ?????? ???????????? ????????? ?????? ?????????
          var imageSize = new window.kakao.maps.Size(20, 30);
          // ?????? ???????????? ???????????????
          var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
          let item = res[i];
          let lat = res[i].lat
          let lng = res[i].lng
          var latlng = new window.kakao.maps.LatLng(lat, lng);
          // ????????? ???????????????
          var marker = new window.kakao.maps.Marker({
            map: map, // ????????? ????????? ??????
            position: latlng, // ????????? ????????? ??????
            // title: data[i].title, // ????????? ?????????, ????????? ???????????? ????????? ???????????? ???????????????
            image: markerImage, // ?????? ?????????
          });
          window.kakao.maps.event.addListener(marker, 'click', () => {
            setShow(true)
            setChoiceP(item)
          });
        }
      }
      );
  }
  function makeMap(lat, lon) {
    let mapContainer = document.getElementById("map"), // ????????? ????????? div
      mapOption = {
        center: new window.kakao.maps.LatLng(lat, lon), // ????????? ????????????
        level: 3, // ????????? ?????? ??????
      };
    // ????????? ????????? div???  ?????? ????????????  ????????? ???????????????
    let map = new window.kakao.maps.Map(mapContainer, mapOption);
    getFetch(lat, lon, map);
    map.setDraggable(true);
    window.kakao.maps.event.addListener(map, "center_changed", function () {
      // ?????????  ????????? ???????????????
      let level = map.getLevel();
      // ????????? ??????????????? ???????????????
      let locPosition = map.getCenter();
      let newLat = locPosition.getLat();
      let newLon = locPosition.getLng();
      map.setLevel(level);
      map.setCenter(locPosition);
      getFetch(newLat, newLon, map);
    })
  }
  function moveMyGps() {
    if (navigator.geolocation) {
      // GeoLocation??? ???????????? ?????? ????????? ???????????????
      navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude; // ??????
        let lon = position.coords.longitude; // ??????
        let locPosition = new window.kakao.maps.LatLng(lat, lon); // ????????? ????????? ????????? geolocation?????? ????????? ????????? ???????????????
        // ?????? ??????????????? ??????????????? ???????????????
        makeMap(lat, lon);
      });
    }
  }

  function moveCategory() {
    var geocoder = new window.kakao.maps.services.Geocoder();
    // ????????? ????????? ???????????????
    geocoder.addressSearch(`${ChoiceSido[1]} ${ChoiceGugun[1]} ${ChoiceDong[1]}`, function (result, status) {
      // ??????????????? ????????? ??????????????? 
      if (status === window.kakao.maps.services.Status.OK) {
        makeMap(result[0].y, result[0].x);
      } else {
        alert("????????? ??????????????????.")
        setChoiceSido(['', ''])
        setChoiceGugun(['', ''])
        setChoiceDong(['', ''])
      }
    })
  }



  return (
    <Div>
    <Head>
      <title>????????? ?????? ?????? | ??????-?????????</title>
    </Head>
      <Content>
        <SearchBox>
          <Back
            onClick={() => {
              router.back();
            }}
          />
          <SelectBox onChange={(e) => { setChoiceSido(e.target.value.split(",")) }}>
            <option value="">???/???</option>
            {sido?.map((item) => (
              <option key={item['sidoCode']} value={[item['sidoCode'], item['sidoName']]}>{item['sidoName']}</option>
            ))}
          </SelectBox>
          <SelectBox onChange={(e) => { setChoiceGugun(e.target.value.split(",")) }}>
            <option value="">???/???/???</option>
            {gugun?.map((item) => (
              <option key={item['gugunCode']} value={[item['gugunCode'], item['gugunName'].split(" ")[1]]}>{item['gugunName'].split(" ")[1]}</option>
            ))}
          </SelectBox>
          <SelectBox onChange={(e) => { setChoiceDong(e.target.value.split(",")) }}>
            <option value="">???/???/???</option>
            {dong?.map((item) => (
              <option key={item['dongCode']} value={[item['dongCode'], item['dongName'].split(" ")[2]]}>{item['dongName'].split(" ")[2]}</option>
            ))}
          </SelectBox>
          <SearchIcon onClick={moveCategory} />
          <UserGps onClick={moveMyGps} />
        </SearchBox>
      </Content>
      <PlaceGroup>
        {data?.map((item) => (
          <Place
            key={item.placeId}
            onClick={() => {
              setChoiceP(item);
              makeMap(item.lat, item.lng);
            }}
          >
            <InfoBtn className='detailBtn'
            onClick={()=>{setShow(true)}}
            />
            <PlaceTitle className="placeTitle">{item.name}</PlaceTitle>
            <WithIcon>
              <LocIcon className="icon" /><PlaceAddress>{item.roadAddress}</PlaceAddress>
            </WithIcon>
            {item.content ? <WithIcon>
              <ConIcon className="icon" /><PlaceContent>{item.content}</PlaceContent>
            </WithIcon> : <></>}
          </Place>
        ))}
      </PlaceGroup>
      <Modal show={show} setshow={setShow} data={choiceP} reviews={reviews} imgList={imgList}>
      </Modal>
      <Mapping id="map" />
    </Div>
  );
}

export async function getServerSideProps(context) {
  const queryClient = new QueryClient()
  await queryClient .prefetchQuery(['sido'], ()=>{getSido()})
  await queryClient .prefetchQuery(['gugun'], ()=>{getGugun(context)})
  await queryClient .prefetchQuery(['dong'], ()=>{getDong(context)})
    return {
      props: {
        data: {
          dehydratedState: dehydrate(queryClient )
        },
      },
    } 
    }
