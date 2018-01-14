export class BillStatus {
  private constructor(public name: string) { }

  public static DEDUCT = new BillStatus('deduct');
  public static ADD = new BillStatus('add');
  public static NORMAL = new BillStatus('normal');
  public static HIGHLIGHT = new BillStatus('highlight');

}
