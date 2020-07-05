import { Router, request } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appoitmentsRoutes = Router();
const appointmentsRepository =  new AppointmentsRepository();

appoitmentsRoutes.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();
  return response.json(appointments);
});

appoitmentsRoutes.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));
  const findAppoitmentInSameDate = appointmentsRepository
    .findByDate(parsedDate);

  if (findAppoitmentInSameDate)
    return response.status(400).json({ error: 'Is appoitment is already booked'})

  const appointment = appointmentsRepository.create(provider, parsedDate);

  response.json(appointment);
});

export default appoitmentsRoutes;
