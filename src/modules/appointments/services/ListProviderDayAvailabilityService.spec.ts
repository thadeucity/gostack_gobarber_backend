// import AppError from '@shared/errors/AppError';
import FakeappointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeappointmentsRepository: FakeappointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('List Provider Day Availability', () => {
  beforeEach(() => {
    fakeappointmentsRepository = new FakeappointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeappointmentsRepository,
    );
  });

  it('should be able to list the day availabity from providers', async () => {
    await fakeappointmentsRepository.create({
      provider_id: 'fake_user_id',
      user_id: '11111111',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    await fakeappointmentsRepository.create({
      provider_id: 'fake_user_id',
      user_id: '11111111',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'fake_user_id',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 12, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ]),
    );
  });
});
