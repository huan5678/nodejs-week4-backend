const errorHandle = (res, err) => {
  res.status(400).send(
    {
      status: false,
      message: '請檢查欄位，或是檢查 ID 是否正確',
      error: err
    }
  );
}

module.exports = errorHandle;