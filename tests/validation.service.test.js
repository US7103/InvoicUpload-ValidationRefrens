const validate= require('../src/service/validation.service');

test('should flag missing required fields', ()=>{
    const rows = [{'Invoice Number': 'INV1'}];
    const result=validate(rows);
    expect(result[0].Errors).toContain('Date is required');
});