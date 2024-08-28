import React, { useState, useEffect } from "react";
import '../styles/Admin_Content.css'
import '../styles/QuickFAQPage.css'
import { KoreaLogo, IncomeLogo } from '../components/LogoList'
import {
    colorGetAxios,
    optionGetAxios,
    colorAddAxios,
    optionAddAxios,
    imageUploadAxios,
    carInsertAxios,
    quickDealAxios,
} from '../services/Request'
import { imageResize4_3, generateRandomString } from '../utils/imageResize'
import NoCardList from '../components/NoCardList'
import { CarAddPopUp } from "./PopUp";





export const Admin_QuickDealAdd = (props) => {
    const [categoryStat, setCategoryStat] = useState('국산');
    const [brandStat, setBrandStat] = useState(null);
    const [FAQ_carname, setFAQ_carname] = useState('');
    const [FAQ_carprice, setFAQ_carprice] = useState('');
    const [FAQ_model, setFAQ_model] = useState('');
    const [FAQ_detailmodel, setFAQ_detailmodel] = useState('');
    const [FAQ_startDate, setFAQ_StartDate] = useState({ year: "", month: "" });
    const [imgURL, setImgURL] = useState(null)
    const [rentalPrice, setRentalPrice] = useState('')

    const [monthStat, setMonthStat] = useState('렌트')
    const [payment, setPayment] = useState(null)
    const [deposit, setDeposit] = useState(null)
    const [inColor, setInColor] = useState('')
    const [outColor, setOutColor] = useState('')

    //옵션 배열
    const [optionList, setOptionList] = useState(null)
    const [optionSelectedList, setOptionSelectedList] = useState([])
    const [searchOption, setSearchOption] = useState('');
    const [optionName, setOptionName] = useState('')
    const [optionPrice, setOptionPrice] = useState('')
    const [optionImg, setOptionImg] = useState(null)

    const [popupStat, setPopupStat] = useState(false)

    const years = Array.from({ length: 20 }, (_, i) => (new Date().getFullYear() + i).toString());
    const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await optionGetAxios()
            setOptionList(response1)
        }
        fetchData()
    }, [])


    // 검색어를 포함하는 항목 필터링 (items가 null이 아닐 때만 실행)
    const filteredOption = optionList ? optionList.filter(item =>
        item.name.toLowerCase().includes(searchOption.toLowerCase())
    ) : [];

    const FAQ_handleStartDateChange = (e) => {
        const { name, value } = e.target;
        setFAQ_StartDate({ ...FAQ_startDate, [name]: value });
    };


    if (!optionList) {
        return null
    }
    return (
        <div className="admin_content">
            {popupStat && <CarAddPopUp />}
            <h2>빠른 간편 문의 <span>- 차량 추가</span></h2>
            <div className="header-row" />
            <div className="admin_content_FAQ_add">
                <div className='categoryTitleDiv'>
                    <h3 onClick={() => setCategoryStat('국산')} className={categoryStat === '국산' ? 'selected' : ''}>국산 브랜드</h3>
                    <h3 onClick={() => setCategoryStat('수입')} className={categoryStat === '수입' ? 'selected' : ''}>수입 브랜드</h3>
                </div>
                {categoryStat === '국산' ?
                    <KoreaLogo setStat={setBrandStat} brandStat={brandStat} />
                    : <IncomeLogo setStat={setBrandStat} brandStat={brandStat} />
                }
                <h3>차량 이름</h3>
                <input
                    placeholder='ex) K5'
                    value={FAQ_carname}
                    onChange={(e) => setFAQ_carname(e.target.value)}
                />
                <h3>차량 사진 첨부하기</h3>
                <img
                    src={require('../assets/img/popup/imageUpload.png')}
                    alt="이미지 업로드 이미지"
                    style={{ width: '38px', height: '38px', cursor: 'pointer' }}
                    onClick={() => document.getElementById('fileInput3').click()}
                />
                <input
                    id="fileInput3"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={async (e) => {
                        const response = await imageResize4_3(e)
                        setImgURL(response)
                    }}
                />
                <div className="admin_content_FAQ_preview_img">
                    <img src={imgURL} style={{ width: '100%' }} />
                </div>
                <div className="admin_content_FAQ_newcar_bodySection">
                    <div className="admin_content_FAQ_newcar_PriceSection">
                        <h3>차량 금액</h3>
                        <div className="admin_content_FAQ_newcar_PriceSection_input">
                            <input
                                placeholder='가격을 입력하세요.'
                                type="number"
                                value={FAQ_carprice}
                                onChange={(e) => setFAQ_carprice(e.target.value)}
                            />
                            <p>원</p>
                        </div>
                    </div>
                    <div className="admin_content_FAQ_newcar_DateSection">
                        <h3>신차 출시일</h3>
                        <div className="admin_content_FAQ_newcar_DateSection_input">
                            <div className="date-picker">
                                <select name="year" value={FAQ_startDate.year} onChange={FAQ_handleStartDateChange}>
                                    <option value="">년</option>
                                    {years.map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                                <p>년</p>
                                <select name="month" value={FAQ_startDate.month} onChange={FAQ_handleStartDateChange}>
                                    <option value="">월</option>
                                    {months.map(month => (
                                        <option key={month} value={month}>{month}</option>
                                    ))}
                                </select>
                                <p>월</p>
                            </div>
                        </div>
                    </div>
                </div>
                <h3>이용 방법</h3>
                <div className="admin_content_FAQ_detailSection">
                    <div className="admin_content_FAQ_detail_Section_input">
                        <button onClick={() => setMonthStat('렌트')} className={monthStat === '렌트' && 'selected'}>렌트</button>
                        <button onClick={() => setMonthStat('리스')} className={monthStat === '리스' && 'selected'}>리스</button>
                    </div>
                </div>
                <div className="admin_content_FAQ_newcar_PriceSection">
                    <h3>월 {monthStat}비</h3>
                    <div className="admin_content_FAQ_newcar_PriceSection_input">
                        <input
                            placeholder='금액 입력'
                            value={rentalPrice}
                            type="number"
                            onChange={(e) => setRentalPrice(e.target.value)}
                        />
                        <p>원</p>
                    </div>
                </div>
                <h3>할부</h3>
                <div className="admin_content_FAQ_detailSection">
                    <div className="admin_content_FAQ_detail_Section_input">
                        <button onClick={() => setPayment('12개월')} className={payment === '12개월' && 'selected'}>12개월</button>
                        <button onClick={() => setPayment('24개월')} className={payment === '24개월' && 'selected'}>24개월</button>
                        <button onClick={() => setPayment('36개월')} className={payment === '36개월' && 'selected'}>36개월</button>
                        <button onClick={() => setPayment('48개월')} className={payment === '48개월' && 'selected'}>48개월</button>
                        <button onClick={() => setPayment('60개월')} className={payment === '60개월' && 'selected'}>60개월</button>
                    </div>
                </div>
                <h3>선납금/보증금</h3>
                <div className="admin_content_FAQ_detailSection">
                    <div className="admin_content_FAQ_detail_Section_input">
                        <button onClick={() => setDeposit('선납금')} className={deposit === '선납금' && 'selected'}>선납금</button>
                        <button onClick={() => setDeposit('보증금')} className={deposit === '보증금' && 'selected'}>보증금</button>
                    </div>
                </div>
                <h3>세부모델</h3>
                <div className="admin_content_FAQ_detailSection">
                    <div className="admin_content_FAQ_detail_Section_input">
                        <input
                            placeholder='ex) 2.5 가솔린 터보'
                            value={FAQ_model}
                            onChange={(e) => setFAQ_model(e.target.value)}
                        />
                        <span>-</span>
                        <input
                            placeholder='ex) 프레스티지 4인승 (A/T)'
                            value={FAQ_detailmodel}
                            onChange={(e) => setFAQ_detailmodel(e.target.value)}
                        />
                    </div>
                </div>
                <div className="admin_content_FAQ_newcar_bodySection">
                    <div className="admin_content_FAQ_newcar_PriceSection">
                        <h3>외장 색상</h3>
                        <div className="admin_content_FAQ_newcar_PriceSection_input">
                            <input
                                placeholder='외장 색상 입력'
                                type="number"
                                value={outColor}
                                onChange={(e) => setOutColor(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="admin_content_FAQ_newcar_DateSection">
                        <h3>내장 색상</h3>
                        <div className="admin_content_FAQ_newcar_PriceSection_input">
                            <input
                                placeholder='내장 색상 입력'
                                type="number"
                                value={inColor}
                                onChange={(e) => setInColor(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="admin_content_FAQ_ColorAddDiv">
                    <h3>옵션</h3>
                    <span>
                        <div>
                            <input
                                placeholder='옵션을 검색해주세요'
                                value={searchOption}
                                onChange={(e) => setSearchOption(e.target.value)}
                            />
                            <div className='admin_content_colorCard title'>
                                <p style={{ width: 50 }}>이미지</p>
                                <p>옵션명</p>
                                <p>금액</p>
                            </div>
                            <span></span>
                            <div className='admin_content_colorCardList'>
                                {filteredOption.length === 0 && <NoCardList card={'옵션이'} />}
                                {filteredOption.map((item, idx) => (
                                    <div className='admin_content_colorCard'>
                                        {item.img.slice(0, 1) === 'o'
                                            ? <img src={`${process.env.REACT_APP_IMG_URL}/${item.img}.png`} style={{ height: '100%' }} />
                                            : <img src={item.img} style={{ height: '100%' }} />
                                        }
                                        <p>{item.name}</p>
                                        <p>{parseInt(item.price / 10000).toLocaleString()} 만원</p>
                                        <button
                                            onClick={async () => {
                                                setOptionSelectedList([...optionSelectedList, { name: item.name, price: item.price, img: item.img }])
                                                setOptionList(optionList.filter((_, index) => index !== idx))
                                            }}
                                            style={{ color: 'blue' }}
                                        >
                                            추가
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div>
                                <input
                                    placeholder='옵션명을 입력해주세요'
                                    value={optionName}
                                    onChange={(e) => setOptionName(e.target.value)}
                                />
                                <input
                                    placeholder='만원 단위로 0 모두 입력'
                                    value={optionPrice}
                                    type="number"
                                    onChange={(e) => setOptionPrice(e.target.value)}
                                />
                                <img
                                    src={require('../assets/img/popup/imageUpload.png')}
                                    alt="이미지 업로드 이미지"
                                    style={{ width: '38px', height: '38px', padding: '0 20px', marginTop: 10, cursor: 'pointer' }}
                                    onClick={() => document.getElementById('fileInput4').click()}
                                />
                                <input
                                    id="fileInput4"
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={async (e) => {
                                        const response = await imageResize4_3(e)
                                        setOptionImg(response)
                                    }}
                                />
                                <button
                                    onClick={async () => {
                                        if (optionName !== '' && optionPrice !== '' && optionImg) {
                                            const random = generateRandomString(20)
                                            await optionAddAxios({
                                                name: optionName,
                                                price: optionPrice,
                                                img: `option_${random}`,
                                            })
                                            //await imageUploadAxios(optionImg, `option_${random}`)
                                            setOptionSelectedList([...optionSelectedList, { name: optionName, price: optionPrice, img: optionImg }]);
                                            setOptionName(''); // 입력 필드 초기화
                                            setOptionPrice(''); // 입력 필드 초기화
                                            setOptionImg(null)
                                        }
                                    }}
                                >
                                    추가
                                </button>
                            </div>
                            <div className='admin_content_colorCard title'>
                                <p style={{ width: 50 }}>이미지</p>
                                <p>옵션명</p>
                                <p>금액</p>
                            </div>
                            <span></span>
                            <div className='admin_content_colorCardList'>
                                {optionSelectedList.length === 0 && <NoCardList card={'선택 된 옵션이'} />}
                                {optionSelectedList.map((item, idx) => (
                                    <div className='admin_content_colorCard'>
                                        {item.img.slice(0, 1) === 'o'
                                            ? <img src={`${process.env.REACT_APP_IMG_URL}/${item.img}.png`} style={{ height: '100%' }} />
                                            : <img src={item.img} style={{ height: '100%' }} />
                                        }
                                        <p>{item.name}</p>
                                        <p>{parseInt(item.price / 10000).toLocaleString()} 만원</p>
                                        <button
                                            onClick={async () => {
                                                setOptionList([...optionList, { name: item.name, price: item.price, img: item.img }])
                                                setOptionSelectedList(optionSelectedList.filter((_, index) => index !== idx))
                                            }}
                                        >
                                            삭제
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </span>
                </div>
                <div className="admin_content_FAQ_alladd_buttonSection">
                    <button
                        className="admin_content_FAQ_alladd_addbutton"
                        onClick={async () => {
                            if (FAQ_carname !== '' && FAQ_carprice !== ''
                                && FAQ_startDate.year !== "" && FAQ_startDate.month !== ""
                                && imgURL && rentalPrice !== '') {
                                const random = generateRandomString(20)
                                await carInsertAxios({
                                    entry: categoryStat,                  //국내
                                    enter: brandStat,                     //기아
                                    car_name: FAQ_carname,                //K5
                                    img: `car_${random}`,                 //car_gjanjrbnnbbb23
                                    price: FAQ_carprice,                  //23000000
                                    info: `${FAQ_startDate.year}년형 ${FAQ_model} ${FAQ_detailmodel}`,
                                    month_price: rentalPrice,             //월 리스/렌트 비용
                                    year: FAQ_startDate.year,             //
                                    month: FAQ_startDate.month,           //
                                    option: optionSelectedList,           //
                                    payment: payment,                     //할부 개월
                                    deposit: deposit,                     //선납금/보증금
                                    month_use: monthStat,                 //렌트/리스
                                    in_color: inColor,
                                    out_Color: outColor,
                                })
                                await imageUploadAxios(imgURL, `car_${random}`)
                                setPopupStat(true)
                            }
                        }}
                    >
                        추가
                    </button>
                </div>
            </div>
        </div>
    )
}




export const Admin_QuickDealEdit = (props) => {
    const [carList, setCarList] = useState(null)
    const [filteredList, setFilteredList] = useState(null)
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await quickDealAxios(null, null, null)
            console.log(response)
            setCarList(response)
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (carList) {
            // 검색어를 포함하는 항목 필터링
            setFilteredList(carList.filter(item =>
                item.name.toLowerCase().includes(searchValue.toLowerCase())
            ))
        }
    }, [carList, searchValue])


    const oilFunction = (item) => {
        const oil = [
            item.lpg === 1 && 'LPG',
            item.gasoline === 1 && '가솔린',
            item.diesel === 1 && '디젤',
            item.hybrid === 1 && '하이브리드',
            item.electric === 1 && '전기',
            item.h2 === 1 && '수소',
        ].filter(Boolean).join(', ');
        return oil
    }




    if (!filteredList) {
        return null
    }
    return (
        <div className="admin_content">
            <h2>즉시 출고 <span>- 차량 관리</span></h2>
            <input
                className="admin_content_searchListInput"
                placeholder='차량을 검색해주세요'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <div className="header-row">
                {/* <input type="checkbox" /> */}
            </div>
            <div className="admin_content_HotdealList">
                {filteredList.length === 0 && <NoCardList card={'차량이'} />}
                {filteredList.map((item, idx) => (
                    <div className="admin_content_HotdealItem" key={item.id}>
                        <img
                            className="admin_content_hotdeal-image"
                            src={`${process.env.REACT_APP_IMG_URL}/${item.img}.png`}
                            alt="차량 이미지"
                            onError={(e) => {
                                e.target.onerror = null; // 무한 루프 방지
                                e.target.src = `${process.env.REACT_APP_IMG_URL}/error.png`;
                            }}
                        />
                        <div className="admin_content_hotdeal-info">
                            <h1>{item.enter} {item.name}</h1>
                            <div className='admin_content_hodeal_infosub'>
                                <p>{item.year}.{item.month}</p>
                                <div className='admin_content_hodeal_line' />
                                <p>{item.category}</p>
                                <div className='admin_content_hodeal_line' />
                                <p>{oilFunction(item)}</p>
                            </div>
                            <div className='admin_content_hodeal_infosub'>
                                <p>{item.min_cc.toLocaleString()}CC~{item.max_cc.toLocaleString()}CC</p>
                                <div className='admin_content_hodeal_line' />
                                <p>복합연비 {item.min_fuel_efficiency}~{item.max_fuel_efficiency}km/L</p>
                            </div>
                        </div>
                        <div>
                            <p>내장 색상: {item.in_color}</p>
                            <p>외장 색상: {item.out_color}</p>
                        </div>
                        <div>
                            {item.option.map((item, idx) => (
                                <p>{item.name}</p>
                            ))}
                        </div>
                        <div>
                            <p>트림1: {item.trim1}</p>
                            <p>트림2: {item.trim2}</p>
                        </div>
                        <button className="admin_content_carListDeleteButton">삭제</button>
                    </div>
                ))}
            </div>
        </div>
    )
}