import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '1243214124',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1243214124');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentData = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentData,
      provider_id: '1243214124',
    });

    expect(
      createAppointment.execute({
        date: appointmentData,
        provider_id: '1243214124',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
