import { Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from 'date-fns';

const appoitmentsRoutes = Router();

interface Appointment {
  id: string;
  provider: string;
  date: Date;
}

const appointments: Appointment[] = [];

appoitmentsRoutes.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));
  const findAppoitmentInSameDate = appointments.find(appointment => isEqual(
    parsedDate, appointment.date
  ))

  if (findAppoitmentInSameDate)
    return response.status(400).json({ error: 'Is appoitment is already booked'})

  const appointment = {
    id: uuid(),
    provider,
    date: parsedDate
  }

  appointments.push(appointment);

  response.json(appointment);
});

export default appoitmentsRoutes;
