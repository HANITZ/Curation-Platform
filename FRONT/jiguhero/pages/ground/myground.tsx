import BackTitle from 'components/back';
import styled from 'styled-components';
import getAllGround from 'pages/api/ground/getAllGround';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import {ButtonFull, ParentsDiv} from 'styles/styled';

const Grid = styled('div')`
    display:grid;
    grid-template-columns: repeat(3, 1fr);
    @media only screen and (max-width: 650px) {
        grid-template-columns: repeat(2, 1fr);
  }
  margin-left:25px;
  margin-top:20px;
  margin-right:25px;
`
const GroundItem = styled('div')`
    border: 1px solid #65ace2;
    padding:20px;
    border-radius: 20px;
    margin: 0 10px 20px 10px;
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const GroundTitle = styled('p')`
    margin:5px auto;
    font-weight: bold;
    font-size: 15px;
`
const GroundIcon = styled('p')`
    margin:0;
    font-size:25px;
`
const GroundPlaceLength = styled('p')`
    margin:0;
    font-size:13px;
`
const GroundTop = styled('div')`
margin-left:35px;
`
const Input = styled('input')`
border-radius:10px;
border: 1px solid #888888;
height:40px;
width:80%;
padding: 15px;
font-size:15px;
`
const SearchIcon = styled(SearchRoundedIcon)`
color:#98c064;
font-size:30px;
margin-left:10px;
`
const NoGround = styled('div')`
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top:30px;
    p{
        margin: 10px;
    }
`
const SelectBox = styled('select')`
  height:40px;
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
  appearance:none;  /* 화살표 없애기 공통*/
  ::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
    @media only screen and (max-width: 650px) {
    width:100%;
  }
}
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
const H2 = styled('h2')`
  @media only screen and (max-width: 650px) {
    display:none;
  }
`
const ButtonSelect = styled('div')`
    @media only screen and (min-width: 400px) {
        display:flex;
        justify-content: space-between;
  }
    margin-top:20px;
    /* display:'flex', justifyContent:'space-between', marginTop:'20px' */
`
const Topbutton = styled('div')`
    margin-right:30px;
    @media only screen and (max-width: 400px) {
        display:flex;
        justify-content: flex-end;
        margin-top:20px;
  }
`

export default function GroundList(){
    const router = useRouter();
    const [searchItem, setSearchItem] = useState('');
    const [groundList, setGroundList] = useState([])
    useEffect(()=>{
        getAllGround().then((res) => setGroundList(res))
    }, [])
    function Search(keyword){
        if(keyword === ''){
            getAllGround().then(
                (res) => setGroundList(res)
            )
        }else{
            const result = groundList.filter((ground) => {
                if(ground['title'].includes(keyword)){
                    return ground
                }})
            setGroundList(result)
            setSearchItem('')
        }
    }

    function Filter(key){
        if(key==="1"){
            let res = [...groundList];
            res.sort((a, b)=>{
                return a.groundId - b.groundId
            })
            setGroundList(res)
        }else if(key === "2"){
            let res = [...groundList];
            res.sort((a, b)=>{
                return a.likes - b.likes
            })
            setGroundList(res)
        }else if(key === "3"){
            let res = [...groundList];
            res.sort((a, b)=>{
                return a.hits - b.hits
            })
            setGroundList(res)
        }else if(key==="0"){
            getAllGround().then(
                (res) => setGroundList(res)
            )
        }
    }

    return(
        <ParentsDiv>
            <BackTitle name={'닉네임 대원의 활동구역'}/>
            <GroundTop>
            <H2>🦸🏻 닉네임 대원의 활동구역</H2>
            <p style={{fontSize:'15px'}}>닉네임님의 활동구역을 보여드려요 🔍</p>
            <div style={{display:'flex', alignContent:'center'}}>
            <Input placeholder='활동구역 검색하기' value={searchItem} onChange={(e) => {setSearchItem(e.target.value)}} onClick={()=>{Search('')}} />
            <SearchIcon onClick={()=>{Search(searchItem)}} />
            </div>
            <ButtonSelect>
                <SelectBox onChange={(e)=>{Filter(e.target.value)}}>
                    <option value="1">최신등록순</option>
                    <option value="2">좋아요순</option>
                    <option value="3">조회순</option>
                </SelectBox>
                <Topbutton>
                    <ButtonFull dColor='#65ace2' hColor='#98c064' style={{marginRight:'10px', fontSize:'13px'}}>활동구역 생성</ButtonFull>
                </Topbutton>
            </ButtonSelect>
            </GroundTop>
                { groundList?.length === 0 ? <NoGround>
                    <p style={{fontSize:'50px'}}>🥲</p>
                    <p style={{fontSize:'20px', fontWeight:'bold'}}>앗!</p>
                    <p style={{fontSize:'15px'}}>활동구역이 존재하지 않아요!</p>
                    <p style={{fontSize:'15px'}}>다른 키워드를 검색해볼까요?</p>
                </NoGround>: 
                <Grid>
                {groundList?.map((item)=>(<GroundItem key={item.groundId} onClick={() => {router.push(`ground/${item.groundId}`)}}>
                <GroundIcon>{item.icon}</GroundIcon>
                <GroundTitle>{item.title}</GroundTitle>
                {item.placeIdList ? <GroundPlaceLength>{item.placeIdList.length}개의 장소</GroundPlaceLength> : <GroundPlaceLength>0개의 장소</GroundPlaceLength>}
                </GroundItem>))}</Grid>}
        </ParentsDiv>
    )
}