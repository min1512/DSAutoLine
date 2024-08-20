import React, { useState } from "react";
import GNB from "../components/GNB";
import Footer from "../components/Footer";
import FastFAQSticky from '../components/FastFAQSticky'
import '../styles/ReviewAddPage.css'
import { StarIcon } from "../components/Icons";
import { ReviewAddPagePopUp } from "../components/PopUp";
import { reviewAddAxios } from "../services/Request";





const ReviewAddPage = () => {
    const [popupStat, setPopupStat] = useState(false)

    //insert
    const [name, setName] = useState('')
    const [car, setCar] = useState('')
    const [enter, setEnter] = useState('기아')
    const [starStat, setStarStat] = useState(0)
    const [img, setImg] = useState('K5')
    const [comment, setComment] = useState('')


    const clickFunction = async () => {
        await reviewAddAxios({
            car_name: car,
            enter: enter,
            name: name,
            img: img,
            star: starStat,
            comment: comment,
        })
        setPopupStat(true);
        document.body.style.overflowY = 'hidden'
    }

    return (
        <>
            {popupStat &&
                <ReviewAddPagePopUp />
            }
            <GNB page={'고객 리뷰'} />
            <FastFAQSticky height={450} />
            <section className="reviewAdd_inputSection">
                <h1>리뷰 작성</h1>
                <p>서비스가 어떠셨나요?? 리뷰로 알려주세요</p>
                <span>
                    <h3>이름</h3>
                    <input value={name} onChange={(e) => setName(e.target.value)} />
                </span>
                <span>
                    <h3>차량명</h3>
                    <input value={car} onChange={(e) => setCar(e.target.value)} />
                </span>
                <span>
                    <h3>별점</h3>
                    {Array.from({ length: 5 }, (_, index) => (
                        <span onClick={() => setStarStat(index + 1)}>
                            <StarIcon
                                key={index}
                                size={31}
                                color={index < starStat ? '#FBDA03' : '#9FA5AB'}
                            />
                        </span>
                    ))}
                </span>
                <span>
                    <h3>사진</h3>
                    <img src={require('../assets/img/popup/imageUpload.png')} alt="이미지 업로드 이미지" />
                </span>
                <span>
                    <h3>내용</h3>
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
                </span>
                <button onClick={clickFunction}>작성 완료</button>
            </section>
            <Footer />
        </>
    )
}


export default ReviewAddPage