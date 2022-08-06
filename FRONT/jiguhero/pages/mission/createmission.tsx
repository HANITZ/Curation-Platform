import styled from "styled-components";
import { ButtonFull, ButtonBorder } from 'styles/styled';
import Backcomponents from 'components/back';
import Head from 'next/head';
import { useState } from 'react';


const BoxInput = styled('input')`
  border: #65ACE2 solid 1px ;
  background-color: white;
  border-radius: 15px;
  padding:3px;
  width: 13rem;
  margin-left: 10px;
`

function InputBox() {
  const [text, setText] = useState('')
  const onChange = (event) => {
    setText(event.target.value)
    console.log(event.target.value)
  }
  return (
    <div>
      <a>
        임무명
      </a>
      <BoxInput
        type="text"
        onChange={onChange}
        value={text} />
    </div>
  )
}

function DatePicker() {
  const [startDate, setStartDate] = useState()

  return (
    <>

    </>
  )
}

export default function Createmission() {
  return (
    <>
      {/* 헤더 */}
      <Head>
        <title>임무 생성하기 | 지구-방위대</title>
      </Head>

      {/* 모바일 뷰에서 뒤로가기 버튼! */}
      <Backcomponents name='임무 생성하기'></Backcomponents>

      <>
        <InputBox />
        <DatePicker>

        </DatePicker>
      </>


    </>
  )
}