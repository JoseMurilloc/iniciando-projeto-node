import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

const appoitmentsRoutes = Router();

const appointments: Appointment[] = [];

appoitmentsRoutes.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppoitmentInSameDate = appointments.find(appointment =>
    isEqual(parsedDate, appointment.date)
  )


  if (findAppoitmentInSameDate)
    return response.status(400).json({ error: 'Is appoitment is already booked'})

  const appointment = new Appointment(provider, parsedDate);

  appointments.push(appointment);

  response.json(appointment);
});

export default appoitmentsRoutes;
