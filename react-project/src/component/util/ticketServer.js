import axios from 'axios';

export const fetchTicketsFromServer = async (token, setTickets,  setUserId) => {
  try {
    const response = await axios.get('api/ticket-list', {
      headers: { Authorization: `Bearer ${token}` }
    });

    // 날짜 형식을 YYYY-MM-DD로 변환
    const formattedTickets = response.data.tickets.map(ticket => {
      // 서버에서 받은 날짜를 UTC 기준으로 변환
      const registrationDate = new Date(ticket.registration_date);

      // 로컬 시간대에서 날짜를 YYYY-MM-DD 형식으로 변환
      const formattedDate = registrationDate.toLocaleDateString('en-CA');

      return {
        ...ticket,
        gymName: ticket.climbing_gym_name,
        ticketCount: ticket.ticket_count,
        expiry: ticket.expire,
        registrationDate: formattedDate
      };
    });

    setTickets(formattedTickets);;
    setUserId(response.data.userId);
  } catch (error) {
    console.error('Failed to fetch tickets from server:', error);
    setTickets([]);
  }
};
