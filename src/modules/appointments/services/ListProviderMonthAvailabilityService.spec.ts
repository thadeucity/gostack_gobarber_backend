// import AppError from '@shared/errors/AppError';
import FakeappointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeappointmentsRepository: FakeappointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('List Provider Month Availability', () => {
  beforeEach(() => {
    fakeappointmentsRepository = new FakeappointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeappointmentsRepository,
    );
  });

  it('should be able to list the month availabity from providers', async () => {
    const availableHours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

    const bookAllDay20Promise = availableHours.map(hour => {
      return fakeappointmentsRepository.create({
        provider_id: 'fake_user_id',
        date: new Date(2020, 4, 20, hour, 0, 0),
      });
    });

    const bookAllDay21Promise = availableHours.map(hour => {
      return fakeappointmentsRepository.create({
        provider_id: 'fake_user_id',
        date: new Date(2020, 4, 21, hour, 0, 0),
      });
    });

    await Promise.all(bookAllDay20Promise);
    await Promise.all(bookAllDay21Promise);

    await fakeappointmentsRepository.create({
      provider_id: 'fake_user_id',
      date: new Date(2020, 4, 22, 8, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'fake_user_id',
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: false },
        { day: 22, available: true },
      ]),
    );
  });
});
