import React, { useState, useEffect } from "react";
import '../../styles/mobile/Mobile_QuickFAQ.css'
import Mobile_GNB from "../../components/mobile/Mobile_GNB";
import Mobile_Footer from "../../components/mobile/Mobile_Footer";
import { Mobile_QuickFAQPageCard } from "../../components/mobile/Mobile_Card";
import { Mobile_LogoList } from "../../components/mobile/Mobile_LogoList";
import { quickFAQAxios, eventAxios } from '../../services/Request'
import NoCardList from '../../components/NoCardList'



const Mobile_QuickFAQ = (props) => {
    const [categoryStat, setCategoryStat] = useState('국산')
    const [brandStat, setBrandStat] = useState('기아')
    const [listStat, setListStat] = useState('전체')
    const [quickFAQList, setQuickFAQList] = useState(null)
    const [banner, setBanner] = useState(null)

    // 우선 순위를 정의
    const categoryOrder = ['경차', '소형/승용', 'SUV', '스포츠카', '화물'];

    const fetchData = async (entry, enter, category) => {
        const response1 = await quickFAQAxios(entry, enter, category)
        setQuickFAQList(response1.sort((a, b) => {
            return categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
        }))
        const response2 = await eventAxios(1, 0)
        setBanner(response2)
    }

    useEffect(() => {
        fetchData('국산', '기아', '전체')
    }, [])

    useEffect(() => {
        fetchData(categoryStat, brandStat, listStat)
    }, [categoryStat, brandStat, listStat])


    if (!quickFAQList || !banner) {
        return (
            <img
                src={`${process.env.REACT_APP_IMG_URL}/error.png`}
                style={{width: '100%', height: '100%'}}
            />
        )
    }
    return (
        <div className="mobile_container">
            <Mobile_GNB page={'빠른 간편 문의'} />
            <section className="mobile_hotDeal_eventBannerSection">
                <img src={`${process.env.REACT_APP_IMG_URL}/${banner[0].img}.png`} alt='이벤트 베너' />
            </section>
            <section className="mobile_hotDeal_hotDealListSection">
                <h3>빠른 간편 문의</h3>
                <p>빠르게 문의 해보세요.</p>
                <Mobile_LogoList categoryStat={categoryStat} setCategoryStat={setCategoryStat} brandStat={brandStat} setBrandStat={setBrandStat}/>
                <h4>차량 리스트</h4>
                <span>
                    {quickFAQList.length === 0 && <NoCardList card={'차량이'}/>}
                    {quickFAQList.map((item, _) => (
                        <Mobile_QuickFAQPageCard item={item} />
                    ))}
                </span>
            </section>
            <Mobile_Footer />
        </div>
    )
}

export default Mobile_QuickFAQ