class v2 {
    constructor(in_a, in_b, polar_mode = false) {
      if (!polar_mode) {
        this.x = in_a;
        this.y = in_b;
      } else {
        this.x = in_a * Math.cos(in_b);
        this.y = in_a * Math.sin(in_b);
      }
    }
    get area() {
      return this._calcArea();
    }
    _calcArea() {
      return (this.x * this.y);
    }
    get slope() {
      return this._calcSlope();
    }
    _calcSlope() {
      return (this.x / this.y);
    }
    get r() {
      return this._calcR();
    }
    _calcR() {
      return (Math.sqrt((this.x * this.x)+(this.y * this.y)));
    }
    get theta() {
      return this._calcTheta();
    }
    _calcTheta() {
      return (Math.atan(this.y / this.x));
    }
    isWithin(in_v2a, in_v2b) {
      return ((Math.min(Math.max(in_v2a.x, in_v2b.x), this.x) == Math.max(Math.min(in_v2a.x, in_v2b.x), this.x)) && (Math.min(Math.max(in_v2a.y, in_v2b.y), this.y) == Math.max(Math.min(in_v2a.y, in_v2b.y), this.y)));
    }
    shift(in_v2) {
      this.x += in_v2.x; this.y += in_v2.y;
      return this;
    }
    scaled(in_scalar) {
        return new v2(this.x * in_scalar, this.y *in_scalar)
    }
}