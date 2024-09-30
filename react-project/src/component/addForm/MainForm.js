import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/TicketAddForm.css';
import InputField from './InputField';
import { tcheckInputWord } from '../util/tcheckInputWord';
import OptionButton from './OptionButton';
import axios from 'axios';

function TicketAddForm() {
    const [gymName, setGymName] = useState('');
    const [registrationDate, setRegistrationDate] = useState('');
    const [selectedCount, setSelectedCount] = useState('');
    const [customCount, setCustomCount] = useState('');
    const [expiry, setExpiry] = useState('');
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toLocaleDateString('en-CA');
        setRegistrationDate(formattedDate);

        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, [isLoggedIn]);

    const validateGymName = (event) => {
        const value = event.target.value;

        if (value.length > 15) {
            alert('클라이밍장 이름은 15자 이하로 입력해주세요.');
            event.preventDefault();
            return false;
        } else if (!tcheckInputWord(value)) {
            event.preventDefault();
            return false;
        }
        return true;
    };

    const validateTicketCount = (value) => {
        if (!/^\d*$/.test(value)) {
            alert('숫자만 입력 가능합니다.');
            return false;
        } else if (parseInt(value) > 10) {
            alert('티켓 수량이 유효하지 않습니다. 최대 10개까지 입력 가능합니다.');
            return false;
        }
        return true;
    };

    const handleGymNameChange = (e) => {
        const isValid = validateGymName(e);
        if (isValid) {
            setGymName(e.target.value);
        }
    };

    const handleRegister = async () => {
        const ticketCount = selectedCount || customCount;

        if (!validateTicketCount(ticketCount)) {
            return;
        }

        if (!gymName || !ticketCount || !registrationDate || !expiry) {
            alert('모든 필드를 채워주세요.');
            return;
        }

        const newTicket = {
            gymName,
            ticketCount,
            registrationDate,
            expire: expiry
        };

        if (isLoggedIn) {
            try {
                const token = localStorage.getItem('token');
                await axios.post('/api/ticket-add', newTicket, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // Google Analytics 이벤트 기록
                if (window.gtag) {
                    window.gtag('event', 'ticket_add', {
                        event_category: 'Ticket',
                        event_label: 'Ticket Added',
                        value: 1
                    });
                }
                alert('회수권이 등록되었습니다!');
                navigate('/ticket-list');
            } catch (error) {
                console.error('회수권 등록 실패:', error);
                alert('회수권 등록에 실패했습니다. 다시 시도해주세요.');
            }
        } else {
            // 로그인이 되어있지 않은 경우 로컬 스토리지에 저장
            const existingTickets = JSON.parse(localStorage.getItem('tickets')) || [];

            // 저장된 티켓의 개수 확인
            const ticketCountInLocalStorage = existingTickets.length;
            if (ticketCountInLocalStorage >= 10) {
                alert('최대 10개의 회수권만 저장할 수 있습니다.');
                return; // 최대 개수를 초과하면 등록 중지
            }

            const ticketWithId = { ...newTicket, id: Date.now() };
            existingTickets.push(ticketWithId);
            localStorage.setItem('tickets', JSON.stringify(existingTickets));
            alert('회수권이 등록되었습니다!)');
            navigate('/ticket-list');
        }
    };

    const handleCustomCountChange = (e) => {
        const value = e.target.value;
        if (validateTicketCount(value)) {
            setCustomCount(value);
        }
    };

    return (
        <div>
            <main>
                <div className="app-container">
                    <div className="ticket-form">
                        <h2>회수권 등록</h2>
                        <InputField
                            type="text"
                            placeholder="클라이밍장 이름"
                            value={gymName}
                            onChange={handleGymNameChange}
                        />
                        <div className="ticket-count-options">
                            <OptionButton
                                label="3회"
                                isSelected={selectedCount === '3'}
                                onClick={() => {
                                    setSelectedCount('3');
                                    setCustomCount('');
                                }}
                            />
                            <OptionButton
                                label="5회"
                                isSelected={selectedCount === '5'}
                                onClick={() => {
                                    setSelectedCount('5');
                                    setCustomCount('');
                                }}
                            />
                            <OptionButton
                                label="10회"
                                isSelected={selectedCount === '10'}
                                onClick={() => {
                                    setSelectedCount('10');
                                    setCustomCount('');
                                }}
                            />
                            <OptionButton
                                label="직접 입력"
                                isSelected={selectedCount === ''}
                                onClick={() => {
                                    setSelectedCount('');
                                    setCustomCount('');
                                }}
                            />
                        </div>
                        {selectedCount === '' && (
                            <InputField
                                type="text"
                                placeholder="직접 입력"
                                value={customCount}
                                onChange={handleCustomCountChange}
                            />
                        )}
                        <InputField
                            type="date"
                            placeholder="등록 날짜"
                            value={registrationDate}
                            onChange={(e) => setRegistrationDate(e.target.value)}
                        />
                        <p className="helper-text">(등록할 날짜를 선택하세요.)</p>
                        <div className="expiry-options">
                            <OptionButton
                                label="3개월"
                                isSelected={expiry === '3개월'}
                                onClick={() => setExpiry('3개월')}
                            />
                            <OptionButton
                                label="6개월"
                                isSelected={expiry === '6개월'}
                                onClick={() => setExpiry('6개월')}
                            />
                            <OptionButton
                                label="7개월"
                                isSelected={expiry === '7개월'}
                                onClick={() => setExpiry('7개월')}
                            />
                            <OptionButton
                                label="1년"
                                isSelected={expiry === '1년'}
                                onClick={() => setExpiry('1년')}
                            />
                        </div>
                        <p className="helper-text">(사용기한을 선택하세요.)</p>
                        <button onClick={handleRegister}>등록</button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default TicketAddForm;
