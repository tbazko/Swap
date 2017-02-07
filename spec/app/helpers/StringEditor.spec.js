'use strict';
const editor = rootRequire('app/helpers/StringEditor');

describe('StringEditor', () => {
  it('should escape string', () => {
    expect(editor.escape('&"\'<>/\\`')).toEqual('&amp;&quot;&#x27;&lt;&gt;&#x2F;&#x5C;&#96;');
  });

  it('should return undefined or null', () => {
    expect(editor.escape(undefined)).toEqual(undefined);
    expect(editor.escape(null)).toEqual(null);
    expect(editor.unescape(undefined)).toEqual(undefined);
    expect(editor.unescape(null)).toEqual(null);
    expect(editor.trim(undefined)).toEqual(undefined);
    expect(editor.trim(null)).toEqual(null);
  });

  it('should unescape string', () => {
    expect(editor.unescape('&amp;&quot;&#x27;&lt;&gt;&#x2F;&#x5C;&#96;')).toEqual('&"\'<>/&#x5C;`')
  });

  it('should trim string', () => {
    expect(editor.trim(' test ')).toEqual('test');
    expect(editor.trim('  test  ')).toEqual('test');
    expect(editor.trim('   test   ')).toEqual('test');
    expect(editor.trim('   test   test ')).toEqual('test   test');
    expect(editor.trim('  1 test   test ')).toEqual('1 test   test');
  });

  it('should trim string on left', () => {
    expect(editor.ltrim(' test ')).toEqual('test ');
    expect(editor.ltrim('  test  ')).toEqual('test  ');
    expect(editor.ltrim('   test')).toEqual('test');
  });

  it('should trim string on right', () => {
    expect(editor.rtrim(' test ')).toEqual(' test');
    expect(editor.rtrim('  test  ')).toEqual('  test');
    expect(editor.rtrim('test   ')).toEqual('test');
  });
});
