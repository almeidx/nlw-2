export default class Util {
  public static convertTimeToMinutes(time: string): number {
    const [hours, mins] = time.split(':').map(Number);
    return (hours * 60) + mins;
  }
}
