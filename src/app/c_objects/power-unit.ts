export class PowerUnit {
  private constructor(public name: string, public unitMeasure: number) { }

  public static WATT = new PowerUnit('W, Watt', 1);
  public static KILOWATT = new PowerUnit('kW, kiloWatt', 1000);
  public static MEGAWATT = new PowerUnit('MW, MegaWatt', 1000000);
  public static GIGAWATT = new PowerUnit('GW, GigaWatt', 1000000000);
  public static TERRAWATT = new PowerUnit('TW, TerraWatt', 1000000000000);

}
