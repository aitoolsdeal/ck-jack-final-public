export const usersHead = [
    {
        Header: 'Photo',
        id: 'photo',
    },
    {
        Header: 'Name',
        accessor: 'name',
        id: 'name',
    },
    {
        Header: 'Email',
        accessor: 'email',
        id: 'email',
    },
    {
        Header: 'Status',
        accessor: 'status',
        id: 'status',
    },
    {
        Header: 'Pricing Id',
        accessor: 'pricing_plan_id',
        id: 'pricing_id',
    },
    {
        Header: 'Pricing Type',
        accessor: 'pricing_plan.type',
        id: 'pricing_type',
    },
    {
        Header: 'Action',
        id: 'action',
    },
];

export const subscriptionsHead = [
    {
        Header: 'Customer Id',
        accessor: 'customer',
        id: 'customer',
    },
    {
        Header: 'Subscription Id',
        accessor: 'id',
        id: 'subscription_id',
    },
    {
        Header: 'Total Amount',
        accessor: 'plan.amount',
        id: 'amount',
    },
    // {
    //     Header: "Payment Method",
    //     accessor: "method",
    //     id: "method",
    // },
    {
        Header: 'Subscription Type',
        accessor: 'plan.interval',
        id: 'interval',
    },
    {
        Header: 'Status',
        accessor: 'status',
        id: 'status',
    },
    {
        Header: 'Cancel At Period End',
        id: 'cancel_at',
    },
    {
        Header: 'Paid On',
        accessor: 'plan.created',
        id: 'created',
    },
    {
        Header: 'Action',
        id: 'action',
    },
];

export const chargesHead = [
    {
        Header: 'Charge Id',
        accessor: 'id',
        id: 'charge_id',
    },
    {
        Header: 'Transaction Id',
        accessor: 'balance_transaction',
        id: 'transaction_id',
    },
    {
        Header: 'Charge Amount',
        accessor: 'amount',
        id: 'amount',
    },
    {
        Header: 'Payment Method',
        accessor: 'payment_method_details.type',
        id: 'method',
    },
    {
        Header: 'Status',
        accessor: 'status',
        id: 'status',
    },
    {
        Header: 'Charged At',
        accessor: 'created',
        id: 'created',
    },
    {
        Header: 'Action',
        id: 'action',
    },
];

export const invoicesHead = [
    {
        Header: 'Invoice Id',
        accessor: 'id',
        id: 'invoice_id',
    },
    {
        Header: 'Customer Id',
        accessor: 'customer',
        id: 'customer',
    },
    {
        Header: 'Customer Name',
        accessor: 'customer_name',
        id: 'name',
    },
    {
        Header: 'Customer Email',
        accessor: 'customer_email',
        id: 'email',
    },
    {
        Header: 'Status',
        accessor: 'status',
        id: 'status',
    },
    {
        Header: 'Total Paid',
        accessor: 'total',
        id: 'total',
    },
    {
        Header: 'Invoice Type',
        id: 'invoice_type',
    },
    {
        Header: 'Created At',
        accessor: 'created',
        id: 'created',
    },
    {
        Header: 'Action',
        id: 'action',
    },
];
