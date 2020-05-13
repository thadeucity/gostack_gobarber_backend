// import AppError from '@shared/errors/AppError';
import FakeappointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeappointmentsRepository: FakeappointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;

describe('List Provider Day Availability', () => {
  beforeEach(() => {
    fakeappointmentsRepository = new FakeappointmentsRepository();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeappointmentsRepository,
    );
  });

  it('should be able to list the appointments on a specific date', async () => {
    const appointment1 = await fakeappointmentsRepository.create({
      provider_id: 'provider',
      user_id: '11111111',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    const appointment2 = await fakeappointmentsRepository.create({
      provider_id: 'provider',
      user_id: '11111111',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: 'provider',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
