import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Voucher {
  id: string;
  supplier: string;
  title: string;
  code: string;
  faceValue: number;
  purchaseCost: number;
  rcPrice: number;
  expiry: string;
  status: 'Available' | 'Allocated' | 'Used' | 'Expired';
  assignedUser?: string;
}

interface Request {
  id: string;
  user: string;
  offer: string;
  rcPrice: number;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Fulfilled';
  voucherId?: string;
  date: string;
}

interface DemoUser {
  email: string;
  rc: number;
}

interface Audit {
  date: string;
  action: string;
  detail: string;
}

@Component({
  selector: 'app-voucher-operations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './voucher-operations.html',
  styleUrl: './voucher-operations.scss'
})
export class VoucherOperations implements OnInit {

  tab = 'inventory';
  search = '';
  message = '';

  vouchers: Voucher[] = [];
  requests: Request[] = [];
  audit: Audit[] = [];

  users: DemoUser[] = [
    { email: 'traveller01@example.com', rc: 1500 },
    { email: 'hunter02@example.com', rc: 900 },
    { email: 'traveller03@example.com', rc: 1200 }
  ];

  newVoucher = this.blankVoucher();
  requestUser = '';
  requestOffer = '';

  ngOnInit() {
    this.load();
  }

  blankVoucher() {
    return {
      supplier: '',
      title: '',
      code: '',
      faceValue: 0,
      purchaseCost: 0,
      rcPrice: 100,
      expiry: ''
    };
  }

  private save() {
    try {
      localStorage.setItem(
        'wayhunter-voucher-operations-v1',
        JSON.stringify({
          vouchers: this.vouchers,
          requests: this.requests,
          users: this.users,
          audit: this.audit
        })
      );
    } catch {
      this.message = 'Browser storage unavailable';
    }
  }

  private load() {
    try {
      const raw = localStorage.getItem(
        'wayhunter-voucher-operations-v1'
      );

      if (!raw) return;

      const data = JSON.parse(raw);

      this.vouchers = Array.isArray(data.vouchers)
        ? data.vouchers : [];

      this.requests = Array.isArray(data.requests)
        ? data.requests : [];

      this.users = Array.isArray(data.users)
        ? data.users : this.users;

      this.audit = Array.isArray(data.audit)
        ? data.audit : [];
    } catch {
      this.message = 'Saved demo data could not be loaded';
    }
  }

  log(action: string, detail: string) {
    this.audit.unshift({
      date: new Date().toLocaleString(),
      action,
      detail
    });

    this.save();
  }

  get available() {
    return this.vouchers.filter(
      v => v.status === 'Available' &&
      new Date(v.expiry + 'T23:59:59').getTime() >= Date.now()
    );
  }

  get pending() {
    return this.requests.filter(r => r.status === 'Pending');
  }

  get approved() {
    return this.requests.filter(r => r.status === 'Approved');
  }

  get fulfilled() {
    return this.requests.filter(r => r.status === 'Fulfilled');
  }

  get totalCost() {
    return this.vouchers.reduce(
      (sum, v) => sum + Number(v.purchaseCost), 0
    );
  }

  get filteredVouchers() {
    const q = this.search.toLowerCase();

    return this.vouchers.filter(v =>
      [v.title, v.supplier, v.status, v.id]
        .some(x => x.toLowerCase().includes(q))
    );
  }

  get offers() {
    return [...new Set(this.available.map(v => v.title))];
  }

  get partners() {
    return [...new Set(this.vouchers.map(v => v.supplier))];
  }

  balance(email: string) {
    return this.users.find(u => u.email === email)?.rc ?? 0;
  }

  reserved(email: string) {
    return this.requests
      .filter(r =>
        r.user === email &&
        ['Pending', 'Approved'].includes(r.status)
      )
      .reduce((sum, r) => sum + r.rcPrice, 0);
  }

  spendable(email: string) {
    return this.balance(email) - this.reserved(email);
  }

  addVoucher() {
    const v = this.newVoucher;

    if (!v.supplier.trim() || !v.title.trim() ||
        !v.code.trim() || !v.expiry) {
      this.message = 'Fill all voucher fields';
      return;
    }

    if (v.faceValue <= 0 || v.purchaseCost < 0 ||
        v.rcPrice < 100 || !Number.isFinite(v.rcPrice)) {
      this.message = 'Check LKR amounts and RC price (minimum 100)';
      return;
    }

    if (new Date(v.expiry + 'T23:59:59').getTime() < Date.now()) {
      this.message = 'Voucher expiry must be in the future';
      return;
    }

    if (this.vouchers.some(x => x.code === v.code.trim())) {
      this.message = 'Duplicate voucher code is not allowed';
      return;
    }

    const voucher: Voucher = {
      ...v,
      supplier: v.supplier.trim(),
      title: v.title.trim(),
      code: v.code.trim(),
      faceValue: Number(v.faceValue),
      purchaseCost: Number(v.purchaseCost),
      rcPrice: Number(v.rcPrice),
      id: 'VCH-' + crypto.randomUUID(),
      status: 'Available'
    };

    this.vouchers.unshift(voucher);

    this.newVoucher = this.blankVoucher();

    this.log('Inventory Added', voucher.id);
    this.message = 'Demo voucher registered successfully';
  }

  createRequest() {
    const user = this.users.find(
      u => u.email === this.requestUser
    );

    const offer = this.available.find(
      v => v.title === this.requestOffer
    );

    if (!user || !offer) {
      this.message = 'Select valid user and available offer';
      return;
    }

    if (this.spendable(user.email) < offer.rcPrice) {
      this.message = 'Insufficient spendable RC';
      return;
    }

    const request: Request = {
      id: 'REQ-' + crypto.randomUUID(),
      user: user.email,
      offer: offer.title,
      rcPrice: offer.rcPrice,
      status: 'Pending',
      date: new Date().toISOString().slice(0, 10)
    };

    this.requests.unshift(request);

    this.log('Redemption Requested', request.id);
    this.message = 'Request pending - RC reserved in demo';
  }

  approve(r: Request) {
    if (r.status !== 'Pending') return;

    const stock = this.available.find(
      v => v.title === r.offer && v.rcPrice === r.rcPrice
    );

    if (!stock) {
      this.message = 'No valid voucher stock available';
      return;
    }

    r.status = 'Approved';

    this.log('Request Approved', r.id);
    this.message = 'Approved - voucher allocation pending';
  }

  reject(r: Request) {
    if (!['Pending', 'Approved'].includes(r.status)) return;

    if (!confirm('Reject this demo redemption request?')) return;

    r.status = 'Rejected';

    this.log('Request Rejected', r.id);
    this.message = 'Rejected - reserved RC released in demo';
  }

  allocate(r: Request) {
    if (r.status !== 'Approved') return;

    const stock = this.available.find(
      v => v.title === r.offer && v.rcPrice === r.rcPrice
    );

    const user = this.users.find(
      u => u.email === r.user
    );

    if (!stock || !user) {
      this.message = 'Stock or user unavailable';
      return;
    }

    if (user.rc < r.rcPrice) {
      this.message = 'Insufficient RC at fulfillment';
      return;
    }

    if (!confirm(
      'Allocate voucher to demo wallet and settle RC?'
    )) return;

    stock.status = 'Allocated';
    stock.assignedUser = user.email;

    r.voucherId = stock.id;
    r.status = 'Fulfilled';

    user.rc -= r.rcPrice;

    this.log(
      'Voucher Allocated',
      `${stock.id} -> ${user.email}; ${r.rcPrice} RC`
    );

    this.message = 'Voucher delivered to demo wallet';
  }

  markUsed(v: Voucher) {
    if (v.status !== 'Allocated') return;

    if (!confirm('Mark this demo voucher as used?')) return;

    v.status = 'Used';
    this.log('Voucher Used', v.id);
  }

  getCode(r: Request) {
    if (r.status !== 'Fulfilled') return '';

    return this.vouchers.find(
      v => v.id === r.voucherId
    )?.code ?? '';
  }

  get myWallet() {
    return this.vouchers.filter(
      v => v.status === 'Allocated' || v.status === 'Used'
    );
  }

  reset() {
    if (!confirm('Reset ALL voucher demo records?')) return;

    this.vouchers = [];
    this.requests = [];
    this.audit = [];

    this.users = [
      { email: 'traveller01@example.com', rc: 1500 },
      { email: 'hunter02@example.com', rc: 900 },
      { email: 'traveller03@example.com', rc: 1200 }
    ];

    this.save();
    this.message = 'Demo data reset';
  }
}
