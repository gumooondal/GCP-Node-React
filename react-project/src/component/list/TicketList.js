// src/components/TicketList.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/TicketList.css';
import { handleReset } from '../util/handleReset';
import { handleDelete } from '../util/handleDelete';
import { fetchTicketsFromServer } from '../util/ticketServer';
import { fetchTicketsFromLocalStorage } from '../util/ticketLocal';
import { handleDecrement } from '../util/handleDecrement';
import TicketCard from './TicketCard';
import ResetButton from './ResetButton';


function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(''); // userPhoneNumber → userId로 변경
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchTicketsFromServer(token, setTickets, setUserId); // setUserPhoneNumber → setUserId로 변경
    } else {
      setIsLoggedIn(false);
      fetchTicketsFromLocalStorage(setTickets);
    }
  }, []);

  const decrementClick = (ticketId) => {
    handleDecrement(ticketId, tickets, setTickets, isLoggedIn, saveTickets);
  };

  const deleteClick = (ticketId) => {
    handleDelete(ticketId, isLoggedIn, tickets, setTickets, saveTickets);
  };

  const resetClick = () => {
    if (userId) { // userPhoneNumber → userId로 변경
      handleReset(isLoggedIn, userId, setTickets); // userPhoneNumber → userId로 변경
    } else {
      console.warn('User ID is not set.'); // Phone number 경고 메시지 수정
    }
  };

  const saveTickets = (updatedTickets) => {
    if (!isLoggedIn) {
      localStorage.setItem('tickets', JSON.stringify(updatedTickets));
    }
    setTickets(updatedTickets);
  };

  return (
    <div className="ticket-list-container">
      <h2>회수권 리스트</h2>
      {isLoggedIn && tickets.length > 0 && (
        <ResetButton onClick={resetClick} />
      )}
      {!isLoggedIn && tickets.length > 0 && (
        <ResetButton onClick={resetClick} />
      )}
      <div className="ticket-list">
        {tickets.length > 0 ? (
          tickets.map(ticket => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onDecrement={() => decrementClick(ticket.id)}
              onDelete={() => deleteClick(ticket.id)}
            />
          ))
        ) : (
          <p>등록된 회수권이 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default TicketList;
