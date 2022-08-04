import GroundTop5 from 'components/Top5Slide';
import styled from 'styled-components';
import MissionTop3 from 'components/MissionTop3'
import Map from 'components/map';
import News from 'components/News';

const Title = styled('p')`
  font-weight: bold;
  font-size: 1em;
`
const Block = styled('div')`
padding: 10px 10px 0 10px;
`
const Content = styled('div')`
  display:flex;
  flex-direction: column;
  align-items: center;
`

export default function Home() {
  return (
    <>
      <Block>
        <Title>☘️ 내 주변 친환경 가게를 찾아보자!</Title>
        <Content>
          <Map address={'광주광역시 북구 용봉로'} />
        </Content>
      </Block>
      <Block>
        <Title>🧐 가장 핫한 대원들의 활동구역 TOP5</Title>
        <Content>
          <GroundTop5 />
        </Content>
      </Block>
      <Block>
        <Title>🔥지금 대원들이 가장 많이 도전 중인 임무</Title>
        <Content>
          <MissionTop3 />
        </Content>
      </Block>
      <Block>
        <Title>📰대원들을 위한 친환경 소식</Title>
        <Content>
          <News />
        </Content>
      </Block>
    </>
  )
}